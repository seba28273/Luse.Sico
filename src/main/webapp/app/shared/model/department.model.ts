import { ILocation } from 'app/shared/model/location.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  location?: ILocation;
  employees?: IEmployee[];
}

export const defaultValue: Readonly<IDepartment> = {};
