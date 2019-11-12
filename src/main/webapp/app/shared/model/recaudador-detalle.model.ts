import { Moment } from 'moment';
import { IRecaudador } from 'app/shared/model/recaudador.model';

export interface IRecaudadorDetalle {
  id?: number;
  ejecutada?: number;
  fechaEjecucion?: Moment;
  fechaProgramada?: Moment;
  nroCuota?: number;
  observaciones?: string;
  reintentos?: number;
  recaudador?: IRecaudador;
    nombre?: string;
    estadocuota?: string;
    cantCuotas?: string;
    vencida?: string;
}

export const defaultValue: Readonly<IRecaudadorDetalle> = {};
