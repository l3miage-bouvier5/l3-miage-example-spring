import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription, combineLatest, delay, filter, lastValueFrom, map, of, shareReplay, startWith, switchMap, take, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, Question, VOTES, convMiahootUser } from '../miahoot';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, docSnapshots, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, User, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ParticipantService } from './participant.service';

export interface STATE {
  miahoot: MiahootProjected;
  qcm: QCMProjected;
  nbVote: number;
  anonymes: string[][]; // ...
}


/**
 * Le service du présentateur
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentMiahootService implements OnDestroy {


  // private sub: Subscription;
  // readonly bsState = new BehaviorSubject<STATE>({miahoot : {} as MiahootProjected, qcm : {} as QCMProjected, nbVote : 0, anonymes : []})

  readonly obsState: Observable<STATE>

  readonly bsResultats = new BehaviorSubject<QCMProjected[]>([])

  readonly bsMiahoot = new BehaviorSubject<Miahoot>({} as Miahoot)

  private questions: Question[] = []
  private bsIndex = new BehaviorSubject<number>(0)

  // readonly obsParticipants : Observable<string[]>

  constructor(private auth: Auth, private fs: Firestore, private router: Router, private ps : ParticipantService) {
    // On construit l'observable pour avoir STATE

    this.obsState = authState(this.auth).pipe(
      startWith(undefined),
      filter(U => !!U),
      map(U => U as User),
      switchMap(user => {
        // Accès au document correspondant à user
        const docUser = doc(fs, `users/${user.uid}`).withConverter(convMiahootUser);
        return docData(docUser);
      }),
      switchMap(miahootUser => {
      
        let pm = miahootUser.miahootProjected;
          const docPM = doc(fs, `miahoot/${pm}`).withConverter(FsMiahootProjectedConverter);
          return docData(docPM);

      }),
      switchMap(miahoot => {
        if(miahoot.id !== undefined){
          
          const docQCM = doc(fs, `miahoot/${miahoot.id}/QCMs/${miahoot.currentQCM}`).withConverter(FsQCMProjectedConverter);
          const obsQCM = docData(docQCM);
  
          return obsQCM.pipe(
            map(qcm => ({
              anonymes:
              qcm.responses.map((_val, index) => {
                let res: string[] = []
                Object.entries(qcm.votes).filter(([_key, value]) => value === index )
                  .forEach(([key, _value]) => {
                    const docName = doc(this.fs, `anonymes/${key}`).withConverter(convMiahootUser)
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
        }else{
          return of({} as STATE)
        }
      }),
      shareReplay(1)
      )
    // this.sub = this.obsState.subscribe()
    
    
  }

  stopAttente(){
    this.obsState.pipe(
      take(1),
      map(state => state.miahoot.id),
      tap(async idMiahoot => {
        const miahootActuel = doc(this.fs, `miahoot/${idMiahoot}`)
        await updateDoc(miahootActuel, {
          attente: false
        })
      })
    ).subscribe()
  }


  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  async nextQuestion() {
    this.obsState.pipe(
      take(1),
      tap(state => {
        this.bsResultats.next([...this.bsResultats.value, state.qcm])
      })
    ).subscribe()

    if (this.bsIndex.value < this.questions.length) {
      const question = this.questions[this.bsIndex.value]
      this.obsState.pipe(
        take(1),
        map(state => state.miahoot.id),
        tap(async idMiahoot => await this.ajouterQuestion(question,idMiahoot))
      ).subscribe()
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
    this.bsResultats.next([])
    this.bsIndex.next(0)
    // ajouter un miahoot à firebase

    this.questions = miahoot.questions

    authState(this.auth).pipe(
      take(1),
      map(async U => {
        if (U) {
          const MhCollection = collection(this.fs, `/miahoot`).withConverter(FsMiahootProjectedConverter)
          const jstp = await addDoc<MiahootProjected>(MhCollection, {
            creator: U.uid,
            presentator: U.uid,
            attente: true,
            currentQCM: "",
            id: "...",
            participants: [],
          })
          await this.ajouterQuestion(miahoot.questions[0],jstp.id)
          const userActuel = doc(this.fs, `users/${U.uid}`).withConverter(convMiahootUser)
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




  async supprimerMiahoot(){
    // supprimer tous les qcms du miahoot dans firebase avant de supprimer le miahoot
    this.bsResultats.next([])
    
    this.obsState.pipe(
      take(1),
      map(state => state.miahoot.id),
      tap(async idMiahoot => {

        const qcms = await getDocs(collection(this.fs, `/miahoot/${idMiahoot}/QCMs`))
        qcms.forEach(async qcm => {
          await deleteDoc(qcm.ref)
        })
        const miahoot = doc(this.fs, `miahoot/${idMiahoot}`)
        await deleteDoc(miahoot)
      })).subscribe()

    this.router.navigateByUrl("miahootChoice")
  }


}
