import { Pipe, PipeTransform } from '@angular/core';
import {Users} from '../../../common/interfaces/user.interface';
import {environment} from '../../../../environment';
import Fuse from 'fuse.js';

@Pipe({
  standalone: true,
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // Рассмотрим два варианта
  transform(users: Users | null, query: string | null): Users {
    if (!users || !query?.trim()) return users || [];

    const lowerQuery = query.toLowerCase().trim();

    if (environment.searchVariant === 2) {
      //  Этот вариант наиболее простой
      //  просто соединим имя и фамилию и будем отдавать варианты подходящие
      //  по сути строгое сравнение
      return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(lowerQuery);
      });
    } else {
      // Этот еще проще :), использование библиотеки нечеткого поиска (Fuse.js)
      const options = {
        keys: ['firstName', 'lastName'],
        threshold: 0.3,
      }
      const fuse = new Fuse(users, options);
      const result = fuse.search(lowerQuery);
      return result.map(r => r.item)
    }
  }

}
