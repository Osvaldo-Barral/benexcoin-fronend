// import React, { useEffect, useState } from 'react';

// import { Transaccion } from '@/interfaces/interfaces';
// import { obtenerTransacciones } from '@/services/transaccion.service';

// interface Props {
//     tipo: 'realizadas' | 'recibidas';
// }

// export const TransaccionesLista: React.FC<Props> = ({ tipo }) => {
//     const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

//     useEffect(() => {
//         obtenerTransacciones(tipo).then(setTransacciones);
//     }, [tipo]);

//     return (
//         <div>
//             <h2 className="title is-4">
//                 {tipo === 'realizadas' ? 'Transferencias Realizadas' : 'Transferencias Recibidas'}
//             </h2>
//             <ul>
//                 {transacciones.map((t) => (
//                     <li key={t.id}>{t.monto} - {t.comision} Bs</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

'use client';

import React, { useEffect, useState } from 'react';
import { Transaccion } from '@/interfaces/interfaces'; // Asegurate de que esta ruta sea correcta
import { obtenerTransacciones } from '@/services/transaccion.service';
import { useRouter } from 'next/navigation';
// import './TransaccionesLista.css'; // opcional, por si querés estilos adicionales

interface Props {
    idUsuario: number;
    tipo: 'realizadas' | 'recibidas';
}

const TransaccionesLista: React.FC<Props> = ({ tipo, idUsuario }) => {

    const router = useRouter();

    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

    useEffect(() => {
        obtenerTransacciones(tipo, idUsuario).then(setTransacciones);
    }, [tipo]);

    return (
        <div className="table-container">
            <h2 className="title is-4">
                {tipo === 'realizadas' ? 'Transferencias Realizadas' : 'Transferencias Recibidas'}
            </h2>
            <table className="table is-striped is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        {tipo === 'realizadas' ? <th>Cuenta Destino</th> : <th>Ceunta Origen</th>}
                        <th>Transacción</th>
                        <th>Monto</th>
                        <th>Comisión</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.map((tx, index) => {
                        const esEnviada = tx.cuentaOrigen.id === idUsuario;
                        const cuentaOpuesta = esEnviada ? tx.cuentaDestino : tx.cuentaOrigen;

                        return (
                            <tr key={tx.id}>
                                <td>{index + 1}</td>
                                <td>{cuentaOpuesta.id}</td>
                                <td>{tx.id}</td>
                                <td>${tx.monto}</td>
                                <td>${tx.comision}</td>
                                <td>{new Date(tx.fecha).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {
                transacciones.length == 0 ? <h2 className="title is-4">Usted no cuenta con transacciones aun</h2> : null
            }
            <div className="mt-4">
                <button className="button is-link" onClick={() => router.push('/')}>
                    Volver al inicio
                </button>
            </div>

        </div>
    );
};

export default TransaccionesLista;

