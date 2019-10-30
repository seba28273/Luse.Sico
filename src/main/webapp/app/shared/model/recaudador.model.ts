import { Moment } from 'moment';
import { IRecaudadorDetalle } from 'app/shared/model/recaudador-detalle.model';

export const enum Periodicidad {
  DIARIO = 'DIARIO',
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
  BIMENSUAL = 'BIMENSUAL',
  SEMESTRAL = 'SEMESTRAL'
}

export const enum TipoCobro {
  PRESTAMO = 'PRESTAMO',
  INSUMOINFORMATICO = 'INSUMOINFORMATICO'
}

export interface IRecaudador {
  id?: number;
  activo?: boolean;
  cantCuotas?: number;
  cantidadRenegociado?: number;
  capitalPrestamo?: number;
  cuotaCobrada?: number;
  cuotaPura?: number;
  cuotaRecuperoCapital?: number;
  diaHoraEjecucion?: number;
  esPersonal?: boolean;
  excluirFindeSemanas?: boolean;
  fechaCreacion?: Moment;
  fechaInicio?: Moment;
  fechaVencimiento?: Moment;
  incobrable?: boolean;
  interesesCuota?: number;
  interesesPrestamos?: number;
  monto?: number;
  observaciones?: string;
  pagoManual?: number;
  periodicidad?: Periodicidad;
  porcParticipacion?: number;
  tipoCobro?: TipoCobro;
  idCliente?: number;
    transferido?: boolean;
  recaudadorDetalles?: IRecaudadorDetalle[];
}

export const defaultValue: Readonly<IRecaudador> = {
  activo: false,
  esPersonal: false,
  excluirFindeSemanas: false,
  incobrable: false
};
