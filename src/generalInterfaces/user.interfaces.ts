export interface userInterface {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleId?: 1 | 2;
  createdAt?: number;
  active?: 0|1;
}
