import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';

export class AuthService {
    isAuth = false;

    signIn() {
        return new Promise(
            // tslint:disable-next-line: no-shadowed-variable
            ( resolve , reject) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        resolve(true);
                    }, 2000 );
            }
        );
    }

    signOut() {
        this.isAuth = false;
    }
}
