import { ActiveHash } from "./active_hash";
import { Task } from "./task";

export class User{
  id: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phone: string;
  birthday: Date;
  hash: ActiveHash;
  customerTaskList: Task[];
  taskPerforms: Task[];
}
