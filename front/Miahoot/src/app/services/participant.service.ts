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
  Subject,
  combineLatest,
  lastValueFrom,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CurrentMiahootService } from './current-miahoot.service';
import {
  FsMiahootProjectedConverter,
  FsQCMProjectedConverter,
  Miahoot,
  MiahootProjected,
  QCMProjected,
  VOTES,
} from '../miahoot';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  miahootId: string = 'Skp4MtR0KtZeBw2EApQZ';
  id: string = '';

  obsProjectedMiahoot!: Observable<MiahootProjected | undefined>;
  obsQCMId!: Observable<string | undefined>;
  obsQCM!: Observable<QCMProjected | undefined>;


  constructor(
    private fs: Firestore,
    private ms: CurrentMiahootService,
  ) {    
  }



  /**
   * fonction qui initialise les Observables
   */
  init() {
    this.obsProjectedMiahoot = docData(
      doc(this.fs, `miahoot/${this.miahootId}`).withConverter(FsMiahootProjectedConverter)
    ).pipe(
      tap(value => console.log("value",value))
    );

    this.obsQCMId = this.obsProjectedMiahoot.pipe(
      switchMap((projectedMiahootID) => {
        console.log("projectedMiahootID",projectedMiahootID);
        
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
    console.log("id",id);
    
    const docMiahoot = doc(this.fs, `miahoot/${this.miahootId}`);
    updateDoc(docMiahoot, {
      participants: arrayUnion(id),
    });
  }

  /***
   * Fonction qui initialise les Observables
   */
  /*
   *Fonction qui permet de voter pour une proposition
   */
  vote(proposition: number) {
    this.obsQCMId.subscribe((qcmId) => {
      if (qcmId != undefined) {
        // const vote: VOTES = {[this.nom]: true};

        const docQCM = doc(
          this.fs,
          `miahoot/${this.miahootId}/QCMs/${qcmId}`
        ).withConverter(FsQCMProjectedConverter);
        const qcm = docData(docQCM);

        qcm
          .pipe(
            take(1),
            switchMap((qcm) => {
              const votes = qcm.votes;
              const newVote = votes[proposition];

              const vote: VOTES = {
                [this.id]: true,
                ...newVote,
              };

              votes[proposition] = vote;
              return updateDoc(docQCM, {
                votes: votes,
              });
            })
          )
          .subscribe();
      }
    });
  }
}
