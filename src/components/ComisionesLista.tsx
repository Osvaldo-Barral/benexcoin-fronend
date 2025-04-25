
'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Comision } from '@/interfaces/interfaces';
import { getComisionHistorial } from '@/services/comision.service';

interface Props {
    idUsuario: number;
}

export const ComisionesLista: React.FC<Props> = ({ idUsuario }) => {

    const router = useRouter();

    const [comisiones, setComisiones] = useState<Comision[]>([])

    useEffect(() => {
        getComisionHistorial(idUsuario).then(setComisiones)
    }, [])


    return (
        <div className="p-4">
            <h2 className="title is-4">Historial de Comisiones</h2>
            <table className="table is-striped is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Beneficio</th>
                        <th>Transacción</th>
                        <th>Cuenta de la Referencia</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {comisiones.map((c, index) => (
                        <tr key={c.id}>
                            <td>{index + 1}</td>
                            <td>${c.monto}</td>
                            <td>{c.Transaccion.id}</td>
                            <td>{c.Transaccion.cuentaOrigen.id}</td>
                            <td>{new Date(c.fecha).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                comisiones.length == 0 ? <h2 className="title is-4">Usted no cuenta conmisiones aun</h2> : null
            }
            <div className="mt-4">
                <button className="button is-link" onClick={() => router.push('/')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}
