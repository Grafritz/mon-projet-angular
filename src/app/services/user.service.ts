import { User } from '../models/User.model';
import { Subject } from 'rxjs';

export class UserService {

    private users: User[] = [
        {
            firstName: 'Jean Fritz',
            lastName: 'DUVERSEAU',
            email: 'duverseau.jeanfritz@gmail.com',
            drinkPreference: 'Rajka',
            hobbies: [
            'Livres', 'Coder', 'Alcool'
            ]
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }
    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}
