import { Transaccion } from '@/interfaces/interfaces';

export const obtenerTransacciones = async (tipo: 'realizadas' | 'recibidas', idUsuario: number): Promise<Transaccion[]> => {
    const endpoint = tipo === 'realizadas'
        ? `http://localhost:5000/transacciones/realizadas/${idUsuario}`
        : `http://localhost:5000/transacciones/recibidas/${idUsuario}`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Error al obtener transacciones');
    return res.json();
};

export const realizarTransferencia = async (
    cuentaOrigen: number,
    cuentaDestino: number,
    monto: number
) => {

    try {
        const response = await fetch('http://localhost:5000/transacciones/transferir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cuentaOrigenId: cuentaOrigen,
                cuentaDestinoId: cuentaDestino,
                monto: monto
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al realizar la transferencia');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Error desconocido al realizar la transferencia');
    }
};
