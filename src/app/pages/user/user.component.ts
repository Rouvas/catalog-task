import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {UserService} from './services/user.service';
import {UserCardComponent} from '../users/components/user-card/user-card.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {User} from '../../common/interfaces/user.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user',
  imports: [
    UserCardComponent,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './user.component.html',
  standalone: true,
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  _user = inject(UserService);
  _route = inject(ActivatedRoute);

  error = signal<string | null>(null)
  user = signal<User | null>(null);

  constructor() {
    // Тут несколько упрощено, т.к. динамически у нас в текущем случае не поменяется id,
    // поэтому возьмем его из снапшота и приведем его сразу к Number (т. к. бэк так или
    // иначе вернет ошибку, если получит некорректный id (NaN))
    const id = Number(this._route.snapshot.params['id']);
    this._user.getUser(id)
      .subscribe({
        next: user => {
          this.user.set(user)
        },
        error: err => {
          this.error.set(err.statusText)
        }
      })
  }
}
