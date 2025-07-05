// Описание пользователя, получаемого с бэка

export interface UserApi {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type UsersApi = UserApi[];
