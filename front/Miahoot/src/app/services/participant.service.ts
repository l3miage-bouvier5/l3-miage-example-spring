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
import { CurrentMiahootService, STATE } from './current-miahoot.service';
import {
  FsMiahootProjectedConverter,
  FsQCMProjectedConverter,
  
  MiahootProjected,
  QCMProjected,
  VOTES,
} from '../miahoot';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  miahootId: string = '';
  id: string = '';

  private sub: Subscription;
  readonly obsState : Observable<STATE>
  // obsProjectedMiahoot!: Observable<MiahootProjected | undefined>;
  // obsQCMId!: Observable<string | undefined>;
  // obsQCM!: Observable<QCMProjected | undefined>;
  
  readonly rsState : ReplaySubject<STATE>( 1 );

  constructor(
    private fs: Firestore,
    private ms: CurrentMiahootService,
  ) {
    this.obsState = this.ms.obsState.pipe(
      startWith(undefined),
      switchMap( state => {
        if ( state === undefined ) {
          return of( undefined );
        } else {
          const docMiahoot = doc( this.fs, `miahoot/${state.miahoot.id}` ).withConverter( FsMiahootProjectedConverter );
          return docData( docMiahoot );
        }
      })
    )

    this.sub = this.obsState.subscribe(this.rsState)
    
  }



  /**
   * fonction qui initialise les Observables
   */
  //ReplaySubject
  init() {
    this.obsProjectedMiahoot = docData(
      doc(this.fs, `miahoot/${this.miahootId}`).withConverter(FsMiahootProjectedConverter)
    )

    this.obsQCMId = this.obsProjectedMiahoot.pipe(
      switchMap((projectedMiahootID) => {
        
        if (projectedMiahootID === undefined) {
          return of(undefined);
        } else {
          // Il faur renvoyer un observable du currentQCM du projected Miahoot M  dans la collection miahoot de Firestore
          const docMiahoot = doc(
            this.fs,
            `miahoot/${projectedMiahootID.id}`
          ).withConverter(FsMiahootProjectedConverter);
          return docData(docMiahoot).pipe(
            map((miahoot: { currentQCM: string }) => miahoot.currentQCM)
          );
        }
      })
    );
    

    this.obsQCM = this.obsQCMId.pipe(
      switchMap((projectedQCMID) => {
        
        if (projectedQCMID === undefined || projectedQCMID === undefined) {
          return of(undefined);
        } else {
          const docProjectedQCM = doc(
            this.fs,
            `/miahoot/${this.miahootId}/QCMs/${projectedQCMID}`
          ).withConverter(FsQCMProjectedConverter);

          return docData(docProjectedQCM);
        }
      })
    )


    
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


  /*
   *Fonction qui permet de voter pour une proposition
   */
  vote(proposition: number) {

    this.obsQCMId.pipe(
      take(1),
      map((qcmId) => {
      if (qcmId) {
        
        const docQCM = doc(this.fs,`miahoot/${this.miahootId}/QCMs/${qcmId}`).withConverter(FsQCMProjectedConverter);
        const qcm = docData(docQCM);

        qcm.pipe(
            take(1),
            switchMap((qcm) => {
              
              return updateDoc(docQCM, {
                votes: votes,
              });
            })
          )
          .subscribe();
      }
      
    })).subscribe()

    
  }
}
