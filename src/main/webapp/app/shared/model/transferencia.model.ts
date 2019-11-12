import { Moment } from 'moment';

export const enum EstadoTransferencia {
    COMPLETA = 'COMPLETA',
    PENDIENTE = 'PENDIENTE',
    CANCELADA = 'CANCELADA'
}

export interface ITransferencia {
  id?: number;
    nrotransferencia?: string;
    nrocuenta?: string;
    cuitdestinatario?: string;
    nombre?: string;
    nrocbu?: string;
    fecha?: Moment;
    estado?: EstadoTransferencia;
    monto?: number;
    status?: string;
}

export const defaultValue: Readonly<ITransferencia> = {};
