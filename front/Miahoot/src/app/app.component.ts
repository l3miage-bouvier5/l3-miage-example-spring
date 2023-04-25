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
  public obs: Observable<MiahootUser | undefined>
  constructor(connexionService: ConnexionService) {
    this.obs = connexionService.obsMiahootConcepteur$;
    
  }

  login(): void {
    this.obs.subscribe( u => {
      if(u){
        this.bsIsAuth.next(true)
      } else{
        this.bsIsAuth.next(false)
      }
    })
  }

}

