

"use client";

import React, { useEffect, useState } from 'react';

import { getContacts } from '@/services/contacto.service';
import { Contacto } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { realizarTransferencia } from '@/services/transaccion.service';

export const ContactoLista = () => {

    const router = useRouter();

    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [id_usuario, setId_usuario] = useState(0);
    const [cuenta, setCuenta] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [mensajeExito, setMensajeExito] = useState('');

    const [modalAbierto, setModalAbierto] = useState(false);
    const [contactoSeleccionado, setContactoSeleccionado] = useState<Contacto | null>(null);
    const [montoTransferencia, setMontoTransferencia] = useState('');
    const [errorMonto, setErrorMonto] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            setCargando(true);
            try {
                const data = await getContacts();
                setContactos(data.contactos);
                setSaldo(data.saldo.saldo)
                setId_usuario(data.saldo.id)
                setCuenta(data.saldo.cuenta)
            } catch (err) {
                setError('No se pudieron cargar los contactos.');
            } finally {
                setCargando(false);
            }
        };

        fetchContacts();
    }, []);

    if (cargando) return <p>Cargando contactos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container p-4">

            <div className="columns is-mobile is-multiline is-variable is-2 mt-5">
                <div
                    onClick={() => router.push(`/transferencias?tipo=realizadas&id_usuario=${id_usuario}`)}
                    className="column is-full-mobile is-one-third-tablet">
                    <button className="button is-primary is-fullwidth" aria-label="Transferencias Realizadas">
                        Transferencias Realizadas
                    </button>
                </div>
                <div className="column is-full-mobile is-one-third-tablet">
                    <button
                        onClick={() => router.push(`/transferencias?tipo=recibidas&id_usuario=${id_usuario}`)}
                        className="button is-primary is-fullwidth" aria-label="Transferencias Recibidas">
                        Transferencias Recibidas
                    </button>
                </div>
                <div className="column is-full-mobile is-one-third-tablet">
                    <button
                        onClick={() => router.push(`/comisiones?id_usuario=${id_usuario}`)}
                        className="button is-primary is-fullwidth" aria-label="Comisiones">
                        Comisiones Historial
                    </button>
                </div>
            </div>

            {/* Información de saldo */}
            <div className="box has-text-centered mt-5">
                <h2 className="title is-2">Saldo disponible: ${saldo.toFixed(2)}</h2>
            </div>

            {/* Lista de contactos */}
            <div className="mt-5">
                <h3 className="title is-5">Lista de Contactos</h3>

                <div className="columns is-multiline is-variable is-3">
                    {contactos.map((contacto, index) => (
                        <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                            <div className="box has-text-centered">
                                <p className="title is-6">{contacto.nombre}</p>
                                <p className="subtitle is-6">Cuenta: {contacto.cuenta}</p>
                                <button
                                    onClick={() => {
                                        setContactoSeleccionado(contacto);
                                        setModalAbierto(true);
                                    }}
                                    className="button is-primary is-fullwidth"
                                    aria-label={`Transferir a ${contacto.nombre}`}
                                >
                                    Realizar Transferencia
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalAbierto && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setModalAbierto(false)}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Confirmar Transferencia</p>
                            <button className="delete" aria-label="close" onClick={() => setModalAbierto(false)}></button>
                        </header>

                        <section className="modal-card-body">
                            <p className="mb-4">Usted está por realizar una transferencia a la cuenta de <strong>{contactoSeleccionado?.nombre}</strong></p>

                            <div className="field">
                                <label className="label">Monto a transferir</label>
                                <div className="control has-icons-right">
                                    <input
                                        className={`input ${errorMonto ? 'is-danger' : ''}`}
                                        type="text"
                                        placeholder="Ej: 100.50"
                                        value={montoTransferencia}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                                                setMontoTransferencia(value);
                                                const monto = parseFloat(value);
                                                if (!isNaN(monto)) {
                                                    if (monto > saldo) {
                                                        setErrorMonto('Saldo insuficiente');
                                                    } else if (monto <= 0) {
                                                        setErrorMonto('El monto debe ser mayor a 0');
                                                    } else {
                                                        setErrorMonto('');
                                                    }
                                                }
                                            } else {
                                                setErrorMonto('Ingrese un monto válido (ej: 150 o 150.50)');
                                            }
                                        }}
                                    />
                                    {mensajeExito && (
                                        <div className="notification is-success mt-3">
                                            <button className="delete" onClick={() => setMensajeExito('')}></button>
                                            {mensajeExito}
                                        </div>
                                    )}

                                    {error && (
                                        <div className="notification is-danger mt-3">
                                            <button className="delete" onClick={() => setError(null)}></button>
                                            {error}
                                        </div>
                                    )}
                                    {!errorMonto && montoTransferencia && (
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-check" style={{ color: 'green' }}></i>
                                        </span>
                                    )}
                                </div>
                                {errorMonto && <p className="help is-danger">{errorMonto}</p>}
                                <p className="help">Saldo disponible: ${saldo.toFixed(2)}</p>
                            </div>
                        </section>

                        <footer className="modal-card-foot">
                            <button
                                className="button is-success"
                                disabled={!montoTransferencia || !!errorMonto || cargando}
                                onClick={async () => {
                                    const monto = parseFloat(montoTransferencia);

                                    if (monto > saldo) {
                                        setErrorMonto('Saldo insuficiente');
                                        return;
                                    }

                                    try {
                                        setCargando(true);
                                        setError(null);

                                        await realizarTransferencia(
                                            cuenta,
                                            contactoSeleccionado!.cuenta,
                                            monto
                                        );

                                        setMensajeExito(`Transferencia de $${monto.toFixed(2)} realizada con éxito!`);

                                        await new Promise(resolve => setTimeout(resolve, 2000));
                                        window.location.reload();

                                        setMontoTransferencia('');
                                    } catch (error) {
                                        setError(error instanceof Error ? error.message : 'Error al realizar la transferencia');
                                    } finally {
                                        setCargando(false);
                                    }
                                }}
                            >
                                {cargando ? (
                                    <>
                                        <span className="icon is-small">
                                            <i className="fas fa-spinner fa-pulse"></i>
                                        </span>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    'Realizar Transferencia'
                                )}
                            </button>
                            <button className="button" onClick={() => setModalAbierto(false)}>
                                Cancelar
                            </button>
                        </footer>
                    </div>
                </div>
            )}

        </div>

    );
};

