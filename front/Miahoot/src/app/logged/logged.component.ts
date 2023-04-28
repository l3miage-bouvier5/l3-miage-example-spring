import { Component } from '@angular/core';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { FsMiahootProjectedConverter, FsQCMProjectedConverter, MiahootProjected, QCMProjected, conv } from '../miahoot';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { CurrentMiahootService } from '../services/current-miahoot.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
  readonly obsProjectedMiahootID: Observable<string | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>

  readonly obsProjectedQCMID : Observable<string | undefined>
  readonly obsProjectedQCM : Observable<undefined | QCMProjected>
  
  constructor(private ms: CurrentMiahootService) {
    this.obsProjectedMiahootID = this.ms.obsProjectedMiahootID
    this.obsProjectedMiahoot = this.ms.obsProjectedMiahoot
    this.obsProjectedQCMID = this.ms.obsProjectedQCMID

    this.obsProjectedQCM = this.ms.obsProjectedQCM


  //   this.obsProjectedMiahootID = authState(auth).pipe(
  //     switchMap( U => {
  //       if (U == null) {
  //         return of(undefined);
  //       } else {
  //         // Il faut renvoyer un observable du projected Miahoot de l'utilisateur U dans la collection users de Firestore
  //         const docUser = doc(fs, `users/${U.uid}`).withConverter(conv);
  //         return docData(docUser).pipe( 
  //           map( (miahootUser: { miahootProjected: string; }) => miahootUser.miahootProjected )
  //         )
  //       }
  //     })
  //   );
  //   this.obsProjectedMiahoot = this.obsProjectedMiahootID.pipe(
  //     switchMap( projectedMiahootID => {
  //       if (projectedMiahootID === undefined) {
  //         return of(undefined);
  //       } else {
  //         // Il faut aller observer un projected Miahoot dans FifreStore, à l'adresse miahoot/projectedMiahootID
  //         const docProjectedMiahoot = doc(fs, `miahoot/${projectedMiahootID}`).withConverter(FsMiahootProjectedConverter);
  //         return docData(docProjectedMiahoot);
  //       }
  //     }
  //   ))

  //   this.obsProjectedQCMID = this.obsProjectedMiahoot.pipe(
  //     switchMap(  projectedMiahootID => {
  //       if(projectedMiahootID === undefined){
  //         return of(undefined)
  //       }else{
  //         // Il faur renvoyer un observable du currentQCM du projected Miahoot M  dans la collection miahoot de Firestore
  //         const docMiahoot = doc(fs, `miahoot/${projectedMiahootID.id}`).withConverter(FsMiahootProjectedConverter);
  //         return docData(docMiahoot).pipe(
  //           map( (miahoot: { currentQCM: string; }) => miahoot.currentQCM )
  //         )
  //       }
  //     })
  //   )

  //   this.obsProjectedQCM = combineLatest([this.obsProjectedMiahootID, this.obsProjectedQCMID]).pipe(
  //     switchMap( ([projectedMiahootID, projectedQCMID]) => {
  //       if(projectedMiahootID === undefined || projectedQCMID === undefined){
  //         return of(undefined)
  //       }else{
  //         const docProjectedQCM = doc(fs,`/miahoot/${projectedMiahootID}/QCMs/${projectedQCMID}`).withConverter(FsQCMProjectedConverter);
  //         return docData(docProjectedQCM);
  //       }
  //     }
  //   )
  //   )
  }
}
