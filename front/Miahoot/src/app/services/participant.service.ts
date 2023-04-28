import { Injectable } from '@angular/core';
import { Firestore, arrayUnion, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CurrentMiahootService } from './current-miahoot.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {



  miahootId :string = ""
  nom : string = ""

  obsMiahootId : Observable<string | undefined>
  constructor(private fs : Firestore,
              private ms : CurrentMiahootService) {
    this.obsMiahootId = this.ms.obsProjectedMiahootID
    
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


  /**
   * Fonction de connexion à la question en cours avec l'id de la question
   */
}
