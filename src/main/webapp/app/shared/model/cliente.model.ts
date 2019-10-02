import { Moment } from 'moment';
import { IDepartment } from 'app/shared/model/department.model';
import { IBanco } from 'app/shared/model/banco.model';

export const enum SEXO {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO'
}

export interface ICliente {
  id?: number;
  firstName?: string;
  lastName?: string;
  dni?: string;
  fechaNacimiento?: Moment;
  direccion?: string;
  numero?: number;
  telefono?: string;
  mail?: string;
  sexo?: SEXO;
  salary?: number;
  scoringCredit?: number;
  department?: IDepartment;
  numero_Cuenta?: string;
  nro_Cbu?: string;
  sex?: string;
  phoneNumber?: string;
  cuit?: string;
  idBanco?: IBanco;
}

export const defaultValue: Readonly<ICliente> = {};
