// src/services/contactService.ts

import { ContactoSaldo } from "@/interfaces/interfaces";

export const getContacts = async (): Promise<ContactoSaldo> => {

    const response = await fetch('http://localhost:5000/cuentas/listar_contactos_saldo');

    if (!response.ok) throw new Error('Error al obtener contactos');
    return response.json();
};
