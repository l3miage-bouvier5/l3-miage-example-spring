import { Component } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { QCMProjected } from '../miahoot';
import { Observable } from 'rxjs';
import { CurrentMiahootService } from '../services/current-miahoot.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {

  obsCurrentQCM : Observable<QCMProjected | undefined>
  constructor(private ms : CurrentMiahootService,
              private ps : ParticipantService) { 
    this.obsCurrentQCM = this.ms.obsProjectedQCM
    
  }

  vote(proposition : number){
    this.ps.vote(proposition)
  }


  
}
