import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription, combineLatest, filter, lastValueFrom, map, of, startWith, switchMap, take, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
import { Firestore, addDoc, collection, collectionData, doc, docData, docSnapshots, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, User, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ParticipantService } from './participant.service';

export interface STATE {
  miahoot: MiahootProjected;
  qcm: QCMProjected;
  nbVote: number;
  anonymes: string[][]; // ...
}

export interface RESULTATS{
  qcm : QCMProjected;
  nbVote : number;
}

/**
 * Le service du présentateur
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentMiahootService implements OnDestroy {


  private sub: Subscription;
  private bsState = new BehaviorSubject<STATE>({miahoot : {} as MiahootProjected, qcm : {} as QCMProjected, nbVote : 0, anonymes : []})

  readonly obsState: Observable<STATE>

  readonly bsResultats = new BehaviorSubject<RESULTATS[]>([])

  private questions: Question[] = []
  private bsIndex = new BehaviorSubject<number>(0)

  constructor(private auth: Auth, private fs: Firestore, private router: Router, private ps : ParticipantService) {
    // On construit l'observable pour avoir STATE

    this.obsState = authState(this.auth).pipe(
      startWith(undefined),
      filter(U => !!U),
      map(U => U as User),
      switchMap(user => {
        // Accès au document correspondant à user
        const docUser = doc(fs, `users/${user.uid}`).withConverter(conv);
        return docData(docUser);
      }),
      switchMap(miahootUser => {
        const pm = miahootUser.miahootProjected;
        const docPM = doc(fs, `miahoot/${pm}`).withConverter(FsMiahootProjectedConverter);
        return docData(docPM);
      }),
      switchMap(miahoot => {
        console.log("miahoot : ", miahoot);
        
        const docQCM = doc(fs, `miahoot/${miahoot.id}/QCMs/${miahoot.currentQCM}`).withConverter(FsQCMProjectedConverter);
        const obsQCM = docData(docQCM);

        return obsQCM.pipe(
          map(qcm => ({
            anonymes:
            qcm.responses.map((_val, index) => {
              let res: string[] = []
              Object.entries(qcm.votes).filter(([_key, value]) => value === index )
                .forEach(([key, _value]) => {
                  const docName = doc(this.fs, `anonymes/${key}`).withConverter(conv)
                  docData(docName).pipe(
                    take(1),
                    tap((anonyme => res.push(anonyme.name)))).subscribe()
                })
              return res
            }),
            miahoot,
            qcm,
            nbVote: Object.keys(qcm.votes).length,
          } satisfies STATE)
          )
        )
      }))
    this.sub = this.obsState.subscribe(this.bsState)
    
    
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  async nextQuestion() {
    const resultats = this.bsResultats.value

      resultats.push({qcm : this.bsState.value.qcm, nbVote : this.bsState.value.nbVote})
      this.bsResultats.next(resultats)
    if (this.bsIndex.value < this.questions.length) {
      const question = this.questions[this.bsIndex.value]
      


      await this.ajouterQuestion(question,this.bsState.value.miahoot.id)
      this.ps.resetVote()
    } else {
      this.router.navigateByUrl("resultats")
    }

  }

  async ajouterQuestion(question: Question,idMiahoot : string) {

          const QCMsCollection = collection(this.fs, `/miahoot/${idMiahoot}/QCMs`)
          const QCMdata = await addDoc(QCMsCollection, {
            question: question.label,
            responses: question.reponses.map(value => value.label),
            correctAnswer: question.reponses.findIndex(value => value.estValide === true),
            votes: {} as VOTES
          })
          const miahootActuel = doc(this.fs, `miahoot/${idMiahoot}`)
          await updateDoc(miahootActuel, {
            currentQCM: QCMdata.id
          })
    this.bsIndex.next(this.bsIndex.value + 1)
  }

  /**
   * Cette fonction permet de créer un nouveau miahoot dans la collection miahoot de firebase et de l'assigner au 
   * miahoot projeté du User actuel afin de le présenter. 
   * Ici on ajoute uniquement la premiere question du miahoot pour pouvoir gérer le changement de question plus facilement
   * 
   * @param miahoot Le miahoot qu'on veut projeter
   */
  async projeterMiahoot(miahoot: Miahoot) {
    this.bsIndex.next(0)
    // ajouter un miahoot à firebase

    this.questions = miahoot.questions

    authState(this.auth).pipe(
      take(1),
      map(async U => {
        if (U) {
          const MhCollection = collection(this.fs, `/miahoot`)
          const jstp = await addDoc(MhCollection, {
            creator: U.uid,
            presentator: U.uid,
          })
          await this.ajouterQuestion(miahoot.questions[0],jstp.id)
          const userActuel = doc(this.fs, `users/${U.uid}`)
          await updateDoc(userActuel, {
            miahootProjected: jstp.id
          })


          
          
        }

      })
    ).subscribe()
  }

  toMiahoots(){
    this.router.navigateByUrl("miahootChoice")
  }



}
