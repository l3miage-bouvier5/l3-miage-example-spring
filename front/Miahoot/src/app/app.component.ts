import { ChangeDetectionStrategy, Component} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnexionService } from './services/connexion.service';
import { Auth, User, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<User | null>
  public bsIsAuth = new BehaviorSubject<boolean>(false)

  constructor(private connexionService: ConnexionService, private auth: Auth) {
    this.user = authState(auth)
    if(this.user){
      console.log("user is auth");
    }
  }
}


