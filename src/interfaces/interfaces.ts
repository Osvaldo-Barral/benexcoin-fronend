export interface Contacto {
    nombre: string;
    cuenta: number;
}

export interface Saldo {
    id: number;
    cuenta: number;
    saldo: number;
}

export interface ContactoSaldo {
    contactos: Contacto[];
    saldo: Saldo;
}

export interface Transaccion {
    id: number;
    monto: string;
    comision: string;
    cuentaOrigen: Cuenta;
    cuentaDestino: Cuenta;
    fecha: Date;
}

export interface Cuenta {
    id: number;
    saldo: string;
}

export interface Comision {
    id: number;
    monto: string;
    fecha: Date;
    Transaccion: Transaccion;
    cuentaBeneficiaria: Cuenta;
}