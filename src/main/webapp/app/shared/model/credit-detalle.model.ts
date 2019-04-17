import { Moment } from 'moment';
import { ICredit } from 'app/shared/model/credit.model';

export interface ICreditDetalle {
  id?: number;
  nroCuota?: number;
  fechaProgramada?: Moment;
  fechaEjecucion?: Moment;
  reintentos?: number;
  ejecutada?: boolean;
  observaciones?: string;
  cantidadRenegociado?: number;
  credit?: ICredit;
}

export const defaultValue: Readonly<ICreditDetalle> = {
  ejecutada: false
};
