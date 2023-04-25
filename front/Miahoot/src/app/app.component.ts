import { ChangeDetectionStrategy, Component} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MiahootConcepteur, MiahootUser } from './miahoot';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<MiahootUser | undefined> = null!;
  public bsIsAuth = new BehaviorSubject<boolean>(false)
  constructor() {
  // public obs: Observable<MiahootUser | undefined>
    // this.obs = connexionService.obsMiahootConcepteur$;
    
  }

}

