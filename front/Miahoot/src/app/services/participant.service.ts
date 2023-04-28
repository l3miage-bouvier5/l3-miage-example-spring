import { Injectable } from '@angular/core';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, MiahootProjected, QCMProjected } from '../miahoot';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {



  miahootId :string = ""
  nom : string = ""

  obsCurrentMiahoot : Observable<MiahootProjected | undefined>
  obsCurrentQuestionId: Observable<string | undefined> 
  obsCurrentQuestion : Observable<QCMProjected | undefined>

  constructor(private fs : Firestore) {

    this.obsCurrentMiahoot = of(this.miahootId).pipe(
      switchMap( projectedMiahootID => {
        if (projectedMiahootID === undefined) {
          return of(undefined);
        } else {
          // Il faut aller observer un projected Miahoot dans FifreStore, à l'adresse miahoot/projectedMiahootID
          const docProjectedMiahoot = doc(fs, `miahoot/${projectedMiahootID}`).withConverter(FsMiahootProjectedConverter);
          return docData(docProjectedMiahoot);
        }
      }
    ))

    this.obsCurrentQuestionId = this.obsCurrentMiahoot.pipe(
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
    this.obsCurrentQuestion = combineLatest([of(this.miahootId), this.obsCurrentQuestionId]).pipe(
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
    
  }
  recupererInfo(){
    return [this.miahootId,this.nom]
  }

  /*
  *Fonction qui permet de voter pour une proposition
  */


  /**
   * Fonction de connexion à la question en cours avec l'id de la question
   */
}
