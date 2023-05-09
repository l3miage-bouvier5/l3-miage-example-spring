import { Component, OnInit } from '@angular/core';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { QCMProjected } from '../miahoot';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent{

  constructor(private ms : CurrentMiahootService) { 
    
  }


  // getTableauDePourcentage(res : QCMProjected[]){
    
  //   const tab = res.map(
  //     value => {
        
  //       const bonneRep = value.correctanwser
  //       const nbVotes = value.votes.reduce((acc,votes) => acc += Object.keys(votes).length, 0)
  //       const nbVotesPourBonneRep = Object.keys(value.votes[bonneRep]).length
  //       return nbVotes === 0 ? 0 : Math.round(nbVotesPourBonneRep / nbVotes * 100)
  //     }
  //   )
    
  //   return tab
  // }


  // getMeilleureQuestion(res : QCMProjected[]){
  //   const tab = this.getTableauDePourcentage(res)
    
  // }

}
