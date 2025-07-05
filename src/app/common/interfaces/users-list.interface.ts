// Под запрос /api/users с пагинацией, тоже приводим к camelCase

import {Users} from './user.interface';

export interface UsersList {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Users;
}
