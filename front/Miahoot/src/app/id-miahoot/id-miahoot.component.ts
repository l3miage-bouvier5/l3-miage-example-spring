import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Miahoot } from '../miahoot';
import { CurrentMiahootService, STATE } from '../services/current-miahoot.service';

@Component({
  selector: 'app-id-miahoot',
  templateUrl: './id-miahoot.component.html',
  styleUrls: ['./id-miahoot.component.scss']
})
export class IdMiahootComponent {
  bsState = new BehaviorSubject<STATE>({} as STATE)
  bsMiahoot = new BehaviorSubject<Miahoot>({} as Miahoot)
  
  constructor(private ms: CurrentMiahootService,
              private router : Router){
    this.ms.bsState.subscribe(this.bsState)
  }
  
  async goMiahoot(){
    this.router.navigateByUrl("logged")
  }

}
