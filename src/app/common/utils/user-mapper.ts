import { User } from '../interfaces/user.interface';
import {UserApi} from '../interfaces/user-api.interface';

export function mapUserToCamelCase(userApi: UserApi): User {
  const { id, email, avatar } = userApi
  return {
    id, email, avatar,
    firstName: userApi.first_name,
    lastName: userApi.last_name,
  }
}
