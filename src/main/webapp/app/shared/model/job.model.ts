import { IEmployee } from 'app/shared/model/employee.model';
import { ITask } from 'app/shared/model/task.model';

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  employee?: IEmployee;
  tasks?: ITask[];
}

export const defaultValue: Readonly<IJob> = {};
