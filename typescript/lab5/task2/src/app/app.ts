import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserCardComponent} from './components/user-card/user-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCardComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task2');

  filterGender: string = '';
  users = [
    { firstName: 'John', lastName: 'Doe', gender: 'male', age: 22, position: 'Developer', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/22/cee3cc51-6cac-459e-9ac2-563ee47390be.jpg', hobbies: ['Reading', 'Gaming'] },
    { firstName: 'Jane', lastName: 'Smith', gender: 'female', age: 19, position: 'Designer', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/17/2a80dd7e-81b2-4504-8843-5496e5ce2374.jpg', hobbies: ['Drawing', 'Traveling'] },
    { firstName: 'Mike', lastName: 'Brown', gender: 'male', age: 25, position: 'Manager', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/22/cee3cc51-6cac-459e-9ac2-563ee47390be.jpg', hobbies: ['Running', 'Chess'] },
    { firstName: 'Emily', lastName: 'Davis', gender: 'female', age: 18, position: 'Intern', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/17/2a80dd7e-81b2-4504-8843-5496e5ce2374.jpg', hobbies: ['Reading', 'Painting'] },
    { firstName: 'Alex', lastName: 'Johnson', gender: 'male', age: 21, position: 'Tester', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/22/cee3cc51-6cac-459e-9ac2-563ee47390be.jpg', hobbies: ['Gaming', 'Music'] },
    { firstName: 'Laura', lastName: 'Wilson', gender: 'female', age: 23, position: 'QA', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/17/2a80dd7e-81b2-4504-8843-5496e5ce2374.jpg', hobbies: ['Yoga', 'Traveling'] },
    { firstName: 'Chris', lastName: 'Lee', gender: 'male', age: 20, position: 'Support', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/22/cee3cc51-6cac-459e-9ac2-563ee47390be.jpg', hobbies: ['Football', 'Cooking'] },
    { firstName: 'Anna', lastName: 'Taylor', gender: 'female', age: 26, position: 'Developer', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/17/2a80dd7e-81b2-4504-8843-5496e5ce2374.jpg', hobbies: ['Photography', 'Music'] },
    { firstName: 'Tom', lastName: 'Anderson', gender: 'male', age: 19, position: 'Designer', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/22/cee3cc51-6cac-459e-9ac2-563ee47390be.jpg', hobbies: ['Drawing', 'Gaming'] },
    { firstName: 'Sara', lastName: 'Martin', gender: 'female', age: 22, position: 'Manager', photo: 'https://imgcdn.stablediffusionweb.com/2024/10/17/2a80dd7e-81b2-4504-8843-5496e5ce2374.jpg', hobbies: ['Traveling', 'Reading'] }
  ];

  setFilter(gender: string) {
    this.filterGender = gender;
  }

  get filteredUsers() {
    if (!this.filterGender) return this.users;
    return this.users.filter(u => u.gender === this.filterGender);
  }
}
