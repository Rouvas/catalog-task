import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../../../../common/interfaces/user.interface';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UserCardComponent {
  @Input({ required:true }) user!: User;
  @Input() hideLink = false;
}
