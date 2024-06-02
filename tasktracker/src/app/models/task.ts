import { Status } from "./Status";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignedTo: any;
}