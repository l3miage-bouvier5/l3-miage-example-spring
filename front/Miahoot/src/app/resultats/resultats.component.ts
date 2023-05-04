import { Component } from '@angular/core';
import { CurrentMiahootService } from '../services/current-miahoot.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent {


  constructor(private ms : CurrentMiahootService) { 
    
  }
}
