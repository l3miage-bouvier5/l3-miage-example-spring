import { Component } from '@angular/core';
import { Miahoot, MiahootUser } from '../miahoot';
import { ConnexionService } from '../services/connexion.service';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ConverterService } from '../services/converter.service';
import { CurrentMiahootService } from '../services/current-miahoot.service';

@Component({
  selector: 'app-miahoot-choice',
  templateUrl: './miahoot-choice.component.html',
  styleUrls: ['./miahoot-choice.component.scss']
})
export class MiahootChoiceComponent {
  // Récupérer tous les miahoots de la base de données et les afficher

  readonly miahoots = new BehaviorSubject<Miahoot[]>([])
  readonly user : Observable<MiahootUser | undefined>
  readonly mUser = new BehaviorSubject<MiahootUser>({} as MiahootUser)
  
  constructor(private cs : ConnexionService,
              private router : Router,
              private conv : ConverterService,
              private ms :  CurrentMiahootService) {
    this.user = this.cs.obsMiahootUser$.pipe(
      tap(async user => {
        if(user) {
          await this.getMiahoots(user.uid)
          this.mUser.next(user)
          
        }
      })
    )
    
  }

  toConceptionMiahoot() {
    this.ms.bsUpdate.next(false)
    this.router.navigateByUrl("conceptionMiahoot")
  }
  
  toAccueil() {
    this.router.navigateByUrl("accueil")
  }

  async getMiahoots(uid:string){
    const res = await this.conv.getMiahoots(uid)
    if(res){
      this.miahoots.next(res)
    }
    
  }

  /*
  async goMiahoot(miahoot: Miahoot){
    await this.ms.projeterMiahoot(miahoot)
    this.router.navigateByUrl("logged")
  }*/

  async afficherIdMiahoot(miahoot: Miahoot){
    await this.ms.projeterMiahoot(miahoot)
    this.router.navigateByUrl("id-miahoot")
  }

  async deleteMiahoot(miahoot: Miahoot) {
    
    this.conv.deleteMiahoot(this.mUser.value.uid, miahoot.nom)
    await this.getMiahoots(this.mUser.value.uid)
    window.location.reload();
  }

  async deleteAll(miahoots: Miahoot[]){
    for(let miahoot of miahoots){
      this.conv.deleteMiahoot(this.mUser.value.uid, miahoot.nom)
      await this.getMiahoots(this.mUser.value.uid)
    }
    window.location.reload();
  }

  updateMiahoot(miahoot: Miahoot) {
    this.ms.bsUpdate.next(true);
    this.ms.bsMiahoot.next(miahoot)
    this.router.navigateByUrl("conceptionMiahoot")
  }
  
}
