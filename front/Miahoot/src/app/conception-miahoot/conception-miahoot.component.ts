import { Component } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { ConverterService } from '../services/converter.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoggedComponent } from '../logged/logged.component';


@Component({
  selector: 'app-conception-miahoot',
  templateUrl: './conception-miahoot.component.html',
  styleUrls: ['./conception-miahoot.component.scss']
})
export class ConceptionMiahootComponent {
  readonly bsJSON = new BehaviorSubject<HighlightAutoResult |undefined>(undefined)


  code: string = `{
    "nom": "LabelExempleDeMiahoot",
    "questions": [
        {
        "label": "exemple d'un miahoot ?",
        "reponses": [
            {
            "label": "response1",
            "estValide": true
            },
            {
            "label": "reponse2",
            "estValide": false
            }
        ]
        },
        {
        "label": "Deuxieme question ?",
        "reponses": [
            {
            "label": "reponse1",
            "estValide": false
            },
            {
            "label": "reponse2",
            "estValide": true
            },
            {
            "label": "reponse3",
            "estValide": false
            },
            {
            "label": "reponse4",
            "estValide": false
            }
        ]
        }
    ]
}`;

  bsErrorMessage = new BehaviorSubject<string>("")
  bsInputFile = new BehaviorSubject<string>("")

  constructor(private hljsLoader: HighlightLoader,
              readonly cs: ConnexionService,
              readonly conv: ConverterService) {
    this.conv.bsErrorMessage.subscribe(this.bsErrorMessage)
              }

  onHighlight(e: HighlightAutoResult) {
    this.bsJSON.next(e ? e : undefined);
  }

  postMiahoot(){
    
    
    if(this.bsJSON.value?.language && this.cs.obsMiahootUser$){
      
      this.cs.obsMiahootUser$.pipe(
        take(1),
        map(async user => {
          try {
            const truc = await this.conv.postMiahoot(user!.uid, this.code);
          } catch (err: any) {
            this.bsErrorMessage.next(err.error.errorMessage)
          }
        })
      ).subscribe();  
    }
  }


  async onChange(event: any) {
    
    const file: File = event.target.files[0];
    
    this.bsInputFile.next(await file.text());
    
    this.code = this.bsInputFile.value
  }
  
}
