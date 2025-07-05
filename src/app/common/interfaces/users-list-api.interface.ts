// Под запрос /api/users с пагинацией, сознательно не трогаем поле support, т.к. не имеет никакого назначения

import {UsersApi} from './user-api.interface';

export interface UsersListApi {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersApi;
}
