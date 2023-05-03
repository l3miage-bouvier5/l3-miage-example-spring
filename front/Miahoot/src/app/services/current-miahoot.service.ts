import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, lastValueFrom, map, of, switchMap, take, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
import { Firestore, addDoc, collection, doc, docData, docSnapshots, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CurrentMiahootService {



  readonly obsProjectedMiahootID: Observable<string | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>

  readonly obsProjectedQCMID : Observable<string | undefined>
  readonly obsProjectedQCM : Observable<undefined | QCMProjected>

  readonly obsNbVote : Observable<number>

  readonly obsAnonymes : Observable<string[][]>

  constructor(private auth: Auth, private fs: Firestore) {
    this.obsProjectedMiahootID = authState(auth).pipe(
      switchMap( U => {
        if (U == null) {
          return of(undefined);
        } else {
          // Il faut renvoyer un observable du projected Miahoot de l'utilisateur U dans la collection users de Firestore
          const docUser = doc(fs, `users/${U.uid}`).withConverter(conv);
          return docData(docUser).pipe( 
            map( (miahootUser: { miahootProjected: string; }) => miahootUser.miahootProjected )
          )
        }
      })
    );
    this.obsProjectedMiahoot = this.obsProjectedMiahootID.pipe(
      switchMap( projectedMiahootID => {
        if (projectedMiahootID === undefined || projectedMiahootID === "") {
          return of(undefined);
        } else {
          // Il faut aller observer un projected Miahoot dans FifreStore, à l'adresse miahoot/projectedMiahootID
          const docProjectedMiahoot = doc(fs, `miahoot/${projectedMiahootID}`).withConverter(FsMiahootProjectedConverter);
          return docData(docProjectedMiahoot);
        }
      }
    ))

    this.obsProjectedQCMID = this.obsProjectedMiahoot.pipe(
      switchMap(  projectedMiahootID => {
        if(projectedMiahootID === undefined){
          return of(undefined)
        }else{
          // Il faur renvoyer un observable du currentQCM du projected Miahoot M  dans la collection miahoot de Firestore
          const docMiahoot = doc(fs, `miahoot/${projectedMiahootID.id}`).withConverter(FsMiahootProjectedConverter);
          return docData(docMiahoot).pipe(
            map( (miahoot: { currentQCM: string; }) => miahoot.currentQCM )
          )
        }
      })
    )

    this.obsProjectedQCM = combineLatest([this.obsProjectedMiahootID, this.obsProjectedQCMID]).pipe(
      switchMap( ([projectedMiahootID, projectedQCMID]) => {
        if(projectedMiahootID === undefined || projectedQCMID === undefined){
          return of(undefined)
        }else{
          const docProjectedQCM = doc(fs,`/miahoot/${projectedMiahootID}/QCMs/${projectedQCMID}`).withConverter(FsQCMProjectedConverter);
          
          return docData(docProjectedQCM);
        }
      }
    )
    )

    this.obsNbVote = this.obsProjectedQCM.pipe(
      map( QCM => {
        if(QCM === undefined){
          return -1
        }else {
          let sum = 0
          if(QCM.votes.length === 0){
            return -1
          }
          QCM.votes.forEach( votes => sum += Object.keys(votes).length)
          return sum
        }

      })
    )

    this.obsAnonymes = this.obsProjectedQCM.pipe(
      map( QCM => {
        if(QCM === undefined){
          return []
        }else{
          const tableau = QCM.votes.map( votes => {
              const res : string[] = []
              const tableauDeClefs = Object.keys(votes)
              tableauDeClefs.map(  clef => {
                const docName = doc(this.fs, `anonymes/${clef}`).withConverter(conv)
                 docData(docName).pipe(
                    take(1),
                    tap( (anonyme => res.push(anonyme.name) ))).subscribe()
                }
              )
              return res
            }
              )
              console.log(tableau)
              return tableau
            }
          }
      )
    )
  }
  

  async ajouterQuestion(question : Question){
    console.log("je suis la");
    
    this.obsProjectedMiahootID.pipe(
      take(1),
      map(async MiahootId => {
          if (MiahootId) {
            const QMCsCollection =  collection(this.fs,`/miahoot/${MiahootId}/QCMs`)
            const jsp = await addDoc(QMCsCollection,{
              question : question.label,
              responses : question.reponses.map( value => value.label),
              correctAnswer: question.reponses.findIndex(value => value.estValide === true),
              votes:[] as VOTES[]
            })
            const miahootActuel = doc(this.fs,`miahoot/${MiahootId}`)
            await updateDoc(miahootActuel,{
              currentQCM : jsp.id
            })
          }
        }
        )
    ).subscribe()
  }



}
