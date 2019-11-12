import { Moment } from 'moment';

export const enum EstadoCuota {
SINENVIAR = 'SIN ENVIAR',
    PAGADA = 'PAGADA',
PENDIENTE = 'PENDIENTE'
}

export interface ICuotasVencidas {
  id?: number;
    ejecutada?: number;
    recaudadorid?:number;
    observaciones?: string;
    nombre?: string;
    cantCuotas?: string;
    fechaProgramada?: Moment;
    estadocuota:EstadoCuota;
    reintentos?: number;
    nroCuota?: number;
    vencidadesc?: string;
}

export const defaultValue: Readonly<ICuotasVencidas> = {
    recaudadorid: 0,
    estadocuota:EstadoCuota.SINENVIAR
};
