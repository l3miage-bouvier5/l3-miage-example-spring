import { Component } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { ConverterService } from '../services/converter.service';


@Component({
  selector: 'app-conception-miahoot',
  templateUrl: './conception-miahoot.component.html',
  styleUrls: ['./conception-miahoot.component.scss']
})
export class ConceptionMiahootComponent {
  readonly bsJSON = new BehaviorSubject<HighlightAutoResult |undefined>(undefined)
  readonly bsValideOuPas = new BehaviorSubject<string>("")
  // pour le choix entre textarea et input file (par défaut false pour textarea)
  readonly bsInput = new BehaviorSubject<boolean>(false)

  code: string = `{
  "Question": "exemple ?",
  "reponse": "oui",
}`;

  bsInputFile = new BehaviorSubject<string>("")

  constructor(private hljsLoader: HighlightLoader,
              readonly cs: ConnexionService,
              private conv: ConverterService) {
              }

  onHighlight(e: HighlightAutoResult) {
    this.bsJSON.next(e ? e : undefined);
  }

  postMiahoot() {
    if(this.bsJSON.value?.language){
      this.cs.obsMiahootUser$.pipe(
        map(user => {
          // this.conv.postMiahoot(user.uid, this.cs.nom, this.bsJSON.value.value)
        })
      )
    }
  }

  update() {
    this.bsInputFile.next(this.code);
  }

  // si il y a un fichier alors on disable le textarea


  async onChange(event: any) {
    
    const file: File = event.target.files[0];
    
    this.bsInputFile.next(await file.text());
    
    this.code = this.bsInputFile.value    

    try {
      JSON.parse(this.bsInputFile.value)
      this.bsValideOuPas.next("C'est ok mon reuf")
    }catch(e) {
      this.bsValideOuPas.next("C'est nul mec")
    }

  }
  
}
