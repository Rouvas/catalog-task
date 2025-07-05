import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../environment';
import {mapUserToCamelCase} from '../../../common/utils/user-mapper';
import {UsersList} from '../../../common/interfaces/users-list.interface';
import {UsersListApi} from '../../../common/interfaces/users-list-api.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly _http = inject(HttpClient);

  getUsers(page: number, perPage: number): Observable<UsersList> {
    return this._http.get<UsersListApi>(`${environment.apiUrl}/users?page=${page + 1}&per_page=${perPage}`)
      .pipe(
        map(usersApi => {
          const { page, total } = usersApi
          return {
            page, total,
            totalPages: usersApi.total_pages,
            data: usersApi.data.map((userApi) => mapUserToCamelCase(userApi)),
            perPage: usersApi.per_page
          }
        })
      );
  }

}
