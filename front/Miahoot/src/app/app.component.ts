import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnexionService } from './services/connexion.service';
import { MiahootUser } from './miahoot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<MiahootUser | undefined>;
  public bsIsAuth = new BehaviorSubject<boolean>( false );

  
  constructor(private router :Router, private connexService : ConnexionService) {
    this.user = this.connexService.obsMiahootConcepteur$;
  }

  async loginGoogle() {
    this.bsIsAuth.next(true);
    this.connexService.loginGoogle()
    this.bsIsAuth.next(false);
  }

  async logout() {
    this.connexService.logout()
  }


  loginWithAdresseMail() {
    this.router.navigateByUrl("loginWithAdresseMail")
  }

  toAccountConfig(){
    this.router.navigateByUrl("accountConfig")
  }
  toMesMiahoots(){
    this.router.navigateByUrl("miahootChoice")
  }

  toMiahootEnCours(){
    this.router.navigateByUrl("logged")
  }
}



