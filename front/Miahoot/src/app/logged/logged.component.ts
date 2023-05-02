import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, MiahootProjected, QCMProjected, Question, conv } from '../miahoot';
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
  
  constructor(private ms: CurrentMiahootService,
              private converter : ConverterService) {
    this.obsProjectedMiahootID = this.ms.obsProjectedMiahootID
    this.obsProjectedMiahoot = this.ms.obsProjectedMiahoot
    this.obsProjectedQCMID = this.ms.obsProjectedQCMID

    this.obsProjectedQCM = this.ms.obsProjectedQCM


  }
  async getQuestion(label :string){
    this.bsQuestion.next(await this.converter.getQuestionByLabel(label))
  }
}
