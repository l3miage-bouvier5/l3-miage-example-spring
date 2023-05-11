import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Miahoot } from '../miahoot';
import { CurrentMiahootService, STATE } from '../services/current-miahoot.service';

@Component({
  selector: 'app-id-miahoot',
  templateUrl: './id-miahoot.component.html',
  styleUrls: ['./id-miahoot.component.scss']
})
export class IdMiahootComponent implements OnInit{
  bsState = new BehaviorSubject<STATE>({} as STATE)
  bsMiahoot = new BehaviorSubject<Miahoot>({} as Miahoot)
  chargement = new BehaviorSubject<boolean>(false)
  
  constructor(private ms: CurrentMiahootService,
              private router : Router){
    this.ms.bsState.subscribe(this.bsState)
    
  }
  
  async goMiahoot(){
    this.router.navigateByUrl("logged")
  }

  ngOnInit(): void {
    this.chargement.next(true)

    setTimeout(() => {
      this.chargement.next(false)
    }, 1500);
}

}
