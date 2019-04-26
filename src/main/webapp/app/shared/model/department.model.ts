import { ICliente } from 'app/shared/model/cliente.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  clientes?: ICliente[];
}

export const defaultValue: Readonly<IDepartment> = {};
