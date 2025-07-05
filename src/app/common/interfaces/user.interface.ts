// Описание преобразованного пользователя (camelCase)

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string
}

export type Users = User[];
