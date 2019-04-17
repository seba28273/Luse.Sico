import { Moment } from 'moment';
import { ICreditDetalle } from 'app/shared/model/credit-detalle.model';

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

export interface ICredit {
  id?: number;
  periodicidad?: Periodicidad;
  diaHoraEjecucion?: number;
  tipoCobro?: TipoCobro;
  monto?: number;
  observaciones?: string;
  activo?: boolean;
  cantCuotas?: number;
  cuotaCobrada?: number;
  fechaCreacion?: Moment;
  fechaInicio?: Moment;
  fechaVencimiento?: Moment;
  excluirFindeSemanas?: boolean;
  porcParticipacion?: number;
  capitalPrestamo?: number;
  interesesPrestamos?: number;
  cuotaPura?: number;
  interesesCuota?: number;
  cuotaRecuperoCapital?: number;
  cantidadRenegociado?: number;
  incobrable?: boolean;
  pagoManual?: boolean;
  esPersonal?: boolean;
  credits?: ICreditDetalle[];
}

export const defaultValue: Readonly<ICredit> = {
  activo: false,
  excluirFindeSemanas: false,
  incobrable: false,
  pagoManual: false,
  esPersonal: false
};
