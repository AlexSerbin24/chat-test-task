
export interface RegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}