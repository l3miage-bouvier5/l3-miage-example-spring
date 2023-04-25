import { ChangeDetectionStrategy, Component} from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Auth, authState, signOut, User, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getDoc } from 'firebase/firestore';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './services/data.service';
import { MiahootUser } from './miahoot';
import { AuthenticationService } from './services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<MiahootUser | undefined> = null!;
  public bsIsAuth = new BehaviorSubject<boolean>(false)
  constructor() {}



}

