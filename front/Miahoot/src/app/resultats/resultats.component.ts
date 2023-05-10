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


}
