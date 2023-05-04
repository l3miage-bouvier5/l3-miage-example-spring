import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
  readonly obsProjectedMiahootID: Observable<string | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>

  readonly obsProjectedQCMID : Observable<string | undefined>
  readonly obsProjectedQCM : Observable<undefined | QCMProjected>

  readonly obsNbVote : Observable<number>

  bsMiahoot = new BehaviorSubject<Miahoot>({
     nom : "",
     questions : []
  })

  readonly obsNames : Observable<string[][]>
  readonly bsBonneReponse = new BehaviorSubject<number>(0)
  readonly bsAfficherBonneReponse = new BehaviorSubject<boolean>(false)

  constructor(private ms: CurrentMiahootService,
              private converter : ConverterService,
              private conv : ConverterService) {
    this.obsProjectedMiahootID = this.ms.obsProjectedMiahootID
    this.obsProjectedMiahoot = this.ms.obsProjectedMiahoot
    this.obsProjectedQCMID = this.ms.obsProjectedQCMID
    this.obsProjectedQCM = this.ms.obsProjectedQCM

    this.obsNbVote = this.ms.obsNbVote

    this.obsNames = this.ms.obsAnonymes

    this.obsProjectedQCM.pipe(
      tap( qcm => {
        if(qcm !== undefined){
          this.bsBonneReponse.next(qcm.correctanwser)
        }
      })
    )
  }

/**
 * Appelle le service pour passer à la question suivante
 */
  async nextQuestion(){
    await this.ms.nextQuestion()
  }


  proportionVote(vote : string[], nbVote : number){
    
    return nbVote !== 0 ? Math.round(vote.length/nbVote * 100):0
  }

  afficherReponse() {
    this.bsAfficherBonneReponse.next(!this.bsAfficherBonneReponse.value)
  }

  async getMiahoot(uid : string , nom : string){
    this.bsMiahoot.next(await this.converter.getMiahoot(uid,nom))
    await this.ms.projeterMiahoot(this.bsMiahoot.value)
  }



}
