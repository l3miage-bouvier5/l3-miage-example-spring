import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, lastValueFrom, map, of, switchMap, take, tap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, Question, VOTES, conv } from '../miahoot';
import { Firestore, addDoc, collection, doc, docData, docSnapshots, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  private questions : Question[] = []
  private bsIndex  = new BehaviorSubject<number>(0)

  constructor(private auth: Auth, private fs: Firestore,private router : Router) {
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
              return tableau
            }
          }
      )
    )
  }
  

  async nextQuestion(){
    if(this.bsIndex.value < this.questions.length){
      const question = this.questions[this.bsIndex.value]
      await this.ajouterQuestion(question)
    }else{
      this.router.navigateByUrl("resultats")
    }
    
  }

  async ajouterQuestion(question : Question){
    
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
    this.bsIndex.next(this.bsIndex.value + 1)
    console.log(this.bsIndex.value);
    
  }

/**
 * Cette fonction permet de créer un nouveau miahoot dans la collection miahoot de firebase et de l'assigner au 
 * miahoot projeté du User actuel afin de le présenter. 
 * Ici on ajoute uniquement la premiere question du miahoot pour pouvoir gérer le changement de question plus facilement
 * 
 * @param miahoot Le miahoot qu'on veut projeter
 */
  async projeterMiahoot(miahoot: Miahoot){
    this.bsIndex.next(0)
    // ajouter un miahoot à firebase
   
    this.questions = miahoot.questions
    console.log(this.questions);
      
    authState(this.auth).pipe(
      take(1),
      map(async  U => {
        if(U){
          const MhCollection = collection(this.fs, `/miahoot`)
          const jstp = await addDoc(MhCollection, {
            creator: U.uid,
            presentator : U.uid
          })
          const userActuel = doc(this.fs,`users/${U.uid}`)
          await updateDoc(userActuel,{
            miahootProjected : jstp.id
          })

          await this.ajouterQuestion(miahoot.questions[0])
        }
        
      })
    ).subscribe()
  }



}
