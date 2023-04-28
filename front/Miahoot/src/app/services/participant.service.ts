import { Injectable } from '@angular/core';
import { Firestore, arrayUnion, collection, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, switchMap, take, tap } from 'rxjs';
import { CurrentMiahootService } from './current-miahoot.service';
import { FsQCMProjectedConverter, QCMProjected, VOTES } from '../miahoot';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {



  miahootId :string = "Skp4MtR0KtZeBw2EApQZ"
  nom : string = "nom au pif"
  qcmId : string = ""

  obsMiahootId : Observable<string | undefined>
  obsQCMId : Observable<string | undefined>
  obsQCM : Observable<QCMProjected | undefined>

  constructor(private fs : Firestore,
              private ms : CurrentMiahootService) {
    this.obsMiahootId = this.ms.obsProjectedMiahootID;
    this.obsQCMId = this.ms.obsProjectedQCMID;
    this.obsQCM = this.ms.obsProjectedQCM;
  }

  /**
   * fonction qui permet d'ajouter un participant au miahoot
   */
  addParticipant(){
    this.obsMiahootId.subscribe( miahootId => {
      if(miahootId != undefined){
        this.miahootId = miahootId
        const docMiahoot = doc(this.fs, `miahoot/${miahootId}`) 
        updateDoc(docMiahoot, {
          participants : arrayUnion(this.nom)
          
        })
      }
    })
  }


  /*
  *Fonction qui permet de voter pour une proposition
  */
  vote(proposition : number){

    this.obsQCMId.subscribe( qcmId => {
      if(qcmId != undefined){
        this.qcmId = qcmId
        
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
