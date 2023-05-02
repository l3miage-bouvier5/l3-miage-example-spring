import { Injectable } from '@angular/core';
import { Firestore, arrayUnion, collection, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, combineLatest, map, of, switchMap, take, tap } from 'rxjs';
import { CurrentMiahootService } from './current-miahoot.service';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, Miahoot, MiahootProjected, QCMProjected, VOTES } from '../miahoot';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {



  miahootId :string = ""
  nom : string = ""

  obsProjectedMiahoot! : Observable<MiahootProjected | undefined>
  obsQCMId! : Observable<string | undefined>
  obsQCM! : Observable<QCMProjected | undefined>

  constructor(private fs : Firestore,
              private ms : CurrentMiahootService) {
  }

  /**
   * fonction qui permet d'ajouter un participant au miahoot
   */
  addParticipant(){
    const docMiahoot = doc(this.fs, `miahoot/${this.miahootId}`) 
        updateDoc(docMiahoot, {
          participants : arrayUnion(this.nom)
        })
  }


  /***
   * Fonction qui initialise les Observables
   */
  init(){
    this.obsProjectedMiahoot = docData(doc(this.fs,`miahoot/${this.miahootId}`).withConverter(FsMiahootProjectedConverter))

    this.obsQCMId = this.obsProjectedMiahoot.pipe(
      switchMap(  projectedMiahootID => {
        if(projectedMiahootID === undefined){
          return of(undefined)
        }else{
          // Il faur renvoyer un observable du currentQCM du projected Miahoot M  dans la collection miahoot de Firestore
          const docMiahoot = doc(this.fs, `miahoot/${projectedMiahootID.id}`).withConverter(FsMiahootProjectedConverter);
          return docData(docMiahoot).pipe(
            map( (miahoot: { currentQCM: string; }) => miahoot.currentQCM )
          )
        }
      })
    )

    this.obsQCM = this.obsQCMId.pipe(
      switchMap( (projectedQCMID) => {
        if(projectedQCMID === undefined || projectedQCMID === undefined){
          return of(undefined)
        }else{
          const docProjectedQCM = doc(this.fs,`/miahoot/${this.miahootId}/QCMs/${projectedQCMID}`).withConverter(FsQCMProjectedConverter);
          console.log(docProjectedQCM);
          
          return docData(docProjectedQCM);
        }
      }
    )
    )
    }
  /*
  *Fonction qui permet de voter pour une proposition
  */
  vote(proposition : number){

    this.obsQCMId.subscribe( qcmId => {
      if(qcmId != undefined){
        // const vote: VOTES = {[this.nom]: true};
        
        const docQCM = doc(this.fs, `miahoot/${this.miahootId}/QCMs/${qcmId}`).withConverter(FsQCMProjectedConverter)
        const qcm = docData(docQCM);
        
        qcm.pipe(    
          take(1),      
          switchMap(qcm => {
            
            const votes = qcm.votes
            const newVote = votes[proposition]

            const vote : VOTES = {
              [this.nom] : true,
              ...newVote
            }
            
            votes[proposition] = vote
            return updateDoc(docQCM, {
              votes : votes
            })
            
          })
        ).subscribe()
      }
    })
  }
  
}
