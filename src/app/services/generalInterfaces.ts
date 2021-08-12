export interface signupUserInterface {
  email: string;
  firstName: 'string';
  lastName ?: string;
  password: 'string';
}
export interface loginUserInterface {
  email: string;
  password: 'string';
}

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
