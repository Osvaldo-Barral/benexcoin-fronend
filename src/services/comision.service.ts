

import { Comision } from "@/interfaces/interfaces";

export const getComisionHistorial = async (idUsuario: number): Promise<Comision[]> => {

    console.log(idUsuario)

    const response = await fetch(`http://localhost:5000/comisiones/historial/${idUsuario}`);

    if (!response.ok) throw new Error('Error al obtener contactos');
    return response.json();
};
