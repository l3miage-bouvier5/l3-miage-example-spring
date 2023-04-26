import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { Auth, User, authState, signInAnonymously, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';


@Component({
  selector: 'app-connexion-anonyme',
  templateUrl: './connexion-anonyme.component.html',
  styleUrls: ['./connexion-anonyme.component.scss']
})
export class ConnexionAnonymeComponent implements OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null>;
  bsIsLoggedIn = new BehaviorSubject<boolean>(false);

  name : string = "The Anonyme"

  constructor(private auth: Auth) {    
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.bsIsLoggedIn.next(isLoggedIn);
      });
    }
  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
  async loginAnonymously() {
    await signInAnonymously(this.auth);
    this.bsIsLoggedIn.next(true)
  }

  async logout() {
    this.bsIsLoggedIn.next(false)
    return await signOut(this.auth);
  }
}
