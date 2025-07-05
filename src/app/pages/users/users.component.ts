import {ChangeDetectionStrategy, Component, effect, inject, Injectable, signal} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {UsersService} from './services/users.service';
import {Users} from '../../common/interfaces/user.interface';
import {UserCardComponent} from './components/user-card/user-card.component';
import {Subject} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Для локализации взял пример из доки Angular Material
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Первая страница`;
  itemsPerPageLabel =`Пользователей на странице:`;
  lastPageLabel = `Последняя страница`;
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Страница ${page + 1} из ${amountPages}`;
  }
}

@Component({
  selector: 'app-users',
  imports: [
    MatPaginatorModule,
    UserCardComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SearchPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users.component.html',
  standalone: true,
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class UsersComponent {

  _users = inject(UsersService);

  searchControl = new FormControl<string>('');

  state = signal<'loading' | 'view'>('view');

  users = signal<Users | null>(null);
  page = signal(0);
  perPage = signal(5);
  total = signal(0);

  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.loadUsers();
    })
  }

  loadUsers(reset = false) {
    this.state.set('loading');
    this._users.getUsers(this.page(), this.perPage())
      .subscribe({
        next: usersList => {
          this.users.set(usersList.data);
          this.total.set(usersList.total);
          this.state.set('view');
        },
        error: err => {
          this.error.set(err.statusText);
          this.state.set('view');
          this.users.set(null);
        }
      })
  }

  reloadData() {
    this.loadUsers(true);
  }


  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
  }

}
