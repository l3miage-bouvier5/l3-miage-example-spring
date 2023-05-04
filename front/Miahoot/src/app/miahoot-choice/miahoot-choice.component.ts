import { Component } from '@angular/core';
import { Miahoot, MiahootUser } from '../miahoot';
import { ConnexionService } from '../services/connexion.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miahoot-choice',
  templateUrl: './miahoot-choice.component.html',
  styleUrls: ['./miahoot-choice.component.scss']
})
export class MiahootChoiceComponent {
  // Récupérer tous les miahoots de la base de données et les afficher

  miahoots : Miahoot[] = []
  readonly user : Observable< MiahootUser | undefined >
  constructor(private cs : ConnexionService,
              private router : Router) {
    this.user = this.cs.obsMiahootUser$
  }

  toConceptionMiahoot() {
    this.router.navigateByUrl("conceptionMiahoot")
  }
  
  toAccueil() {
    this.router.navigateByUrl("accueil")
  }
}
