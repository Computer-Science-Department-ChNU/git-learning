import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-card',
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './user-card.html',
  standalone: true,
  styleUrl: './user-card.css'
})
export class UserCardComponent {
 @Input() user: any;

 getCardColor() {
   return this.user.age > 18 ? 'adult-card' : 'minor-card';
 }
}
