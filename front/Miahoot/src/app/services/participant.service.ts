import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  arrayUnion,
  collection,
  doc,
  docData,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  combineLatest,
  lastValueFrom,
  map,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CurrentMiahootService } from './current-miahoot.service';
import {
  FsMiahootProjectedConverter,
  FsQCMProjectedConverter,
  MiahootProjected,
  QCMProjected,
  VOTES,
} from '../miahoot';




interface STATE_PARTICIPANT{
  miahoot: MiahootProjected;
  qcm: QCMProjected;
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  miahootId: string = '';
  id: string = '';

  private sub!: Subscription;
  obsState!: Observable<STATE_PARTICIPANT>;
  // obsProjectedMiahoot!: Observable<MiahootProjected | undefined>;
  // obsQCMId!: Observable<string | undefined>;
  // obsQCM!: Observable<QCMProjected | undefined>;

  readonly rsState = new ReplaySubject<STATE_PARTICIPANT>(1);


  readonly bsVoted = new BehaviorSubject<number>(-1);

  constructor(private fs: Firestore) {}

  /**
   * fonction qui initialise les Observables
   */
  //ReplaySubject
  init() {

    this.obsState = docData(doc(this.fs, `miahoot/${this.miahootId}`).withConverter(
      FsMiahootProjectedConverter
    )).pipe(
      switchMap(miahoot => {
        const docQCM = doc(this.fs, `miahoot/${miahoot.id}/QCMs/${miahoot.currentQCM}`).withConverter(FsQCMProjectedConverter); 
        const obsQCM = docData(docQCM);
        return obsQCM.pipe(
          map(qcm => ({miahoot, qcm})
          )
        )
      }
          
        )
    )
    this.sub = this.obsState.subscribe(this.rsState);
  }

  /**
   * fonction qui permet d'ajouter un participant au miahoot
   */
  async addParticipant(id: string) {
    this.id = id;
    const docMiahoot = doc(this.fs, `miahoot/${this.miahootId}`);

    updateDoc(docMiahoot, {
      participants: arrayUnion(id),
    });
  }



  /**
   * Fonction qui reset le vote quand on passe à la question suivante
   * 
   */
  resetVote() {
    this.bsVoted.next(-1);
  }

  /*
   *Fonction qui permet de voter pour une proposition
   */
  vote(proposition: number) {
    this.bsVoted.next(proposition);
    this.obsState
      .pipe(
        take(1),
        map((state) => {
          if (state) {
            const docQCM = doc(
              this.fs,
              `miahoot/${state.miahoot.id}/QCMs/${state.qcm.id}`
            ).withConverter(FsQCMProjectedConverter);
            const qcm = docData(docQCM);

            qcm.pipe(
                take(1),
                switchMap((qcm) => {
                  
                  if (qcm) {
                    const votes = qcm.votes;
                    
                    const newVotes = {
                      ...votes,
                      [this.id]: proposition
                    }

                  return updateDoc(docQCM, {
                    votes: newVotes
                  });
                }else{
                  return of(undefined);
                }
              })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }
}
