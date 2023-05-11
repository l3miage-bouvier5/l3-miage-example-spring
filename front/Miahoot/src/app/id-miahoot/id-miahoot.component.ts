import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Miahoot } from '../miahoot';
import { CurrentMiahootService, STATE } from '../services/current-miahoot.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-id-miahoot',
  templateUrl: './id-miahoot.component.html',
  styleUrls: ['./id-miahoot.component.scss']
})
export class IdMiahootComponent implements OnInit{
  obsState : Observable<STATE>
  bsChargement = new BehaviorSubject<boolean>(false)
  

  constructor(private ms: CurrentMiahootService,
              private router : Router,
              private appRef: ApplicationRef){
    this.obsState = this.ms.obsState.pipe(
      tap(state => console.log("state : ", state))
      
    )
  }
  
  async goMiahoot(){
    this.ms.stopAttente()
    this.router.navigateByUrl("logged")
  }

  ngOnInit(): void {
    this.bsChargement.next(true)
    setTimeout(() => {
      this.bsChargement.next(false)
    }
    , 1500)

  }

}
