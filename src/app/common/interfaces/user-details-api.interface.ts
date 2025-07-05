// Интерфейс по детальному получению юзера, сознательно не трогаем поле support, т.к. не имеет никакого назначения

import {UserApi} from './user-api.interface';

export interface UserDetailsApi {
  data: UserApi;
}
