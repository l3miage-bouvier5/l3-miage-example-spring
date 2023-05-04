import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
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

  bsQuestion = new BehaviorSubject<Question>({label : "", reponses: []})
  readonly obsNbVote : Observable<number>

  readonly obsNames : Observable<string[][]>
  readonly bsBonneReponse = new BehaviorSubject<number>(0)
  readonly bsAfficherBonneReponse = new BehaviorSubject<boolean>(false)

  constructor(private ms: CurrentMiahootService,
              private converter : ConverterService) {
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
  async getQuestion(label :string){
    this.bsQuestion.next(await this.converter.getQuestionByLabel(label))
    await this.ajouterQuestion()
  }

  async ajouterQuestion(){
    await this.ms.ajouterQuestion(this.bsQuestion.value)
  }


  proportionVote(vote : string[], nbVote : number){
    
    return nbVote !== 0 ? Math.round(vote.length/nbVote * 100):0
  }

  afficherReponse() {
    this.bsAfficherBonneReponse.next(!this.bsAfficherBonneReponse.value)
  }

}
