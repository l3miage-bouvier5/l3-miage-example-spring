import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { CurrentMiahootService, STATE } from '../services/current-miahoot.service';
import { ConverterService } from '../services/converter.service';



@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnDestroy {
  readonly obsState : Observable<STATE | undefined>

  readonly sub : Subscription
  
  readonly bsMiahoot = new BehaviorSubject<Miahoot>({} as Miahoot)

  readonly bsAfficherBonneReponse = new BehaviorSubject<boolean>(false)
  readonly bsAfficherVote = new BehaviorSubject<boolean>(true)

  constructor(private ms: CurrentMiahootService,
              private converter : ConverterService,
              private conv : ConverterService) {

    this.obsState = this.ms.obsState
    this.sub = this.obsState.subscribe()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
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
    console.log(this.bsMiahoot.value)
    await this.ms.projeterMiahoot(this.bsMiahoot.value)
  }

  afficherVote(){
    this.bsAfficherVote.next(!this.bsAfficherVote.value)
  }

}
