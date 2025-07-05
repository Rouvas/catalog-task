import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environment';
import {map, Observable} from 'rxjs';
import {User} from '../../../common/interfaces/user.interface';
import {mapUserToCamelCase} from '../../../common/utils/user-mapper';
import {UserDetailsApi} from '../../../common/interfaces/user-details-api.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject(HttpClient);

  getUser(id: number): Observable<User> {
    return this._http.get<UserDetailsApi>(`${environment.apiUrl}/users/${id}`)
      .pipe(
        map(userApi => {
          return mapUserToCamelCase(userApi.data)
        })
      );
  }


}
