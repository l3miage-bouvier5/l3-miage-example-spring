import { Component } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { ConverterService } from '../services/converter.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoggedComponent } from '../logged/logged.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';


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
              readonly conv: ConverterService,
              private _snackBar: MatSnackBar) {
    this.conv.bsErrorMessage.subscribe(this.bsErrorMessage)
              }

  onHighlight(e: HighlightAutoResult) {
    this.bsJSON.next(e ? e : undefined);
  }

  postMiahoot() {
    if(this.bsJSON.value?.language){
      this.cs.obsMiahootUser$.pipe(
        take(1),
        map(async user => {
          try {
            const truc = await this.conv.postMiahoot(user!.uid, this.code);
            this.bsValide.next(true)
            this.bsErrorMessage.next("Envoyé !")
            this.openMessage();
          } catch (err: any) {
            this.bsErrorMessage.next(err.error.errorMessage)
            this.openMessage();
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

  openMessage() {
    this.bsErrorMessage.pipe(
      map(value => {
        this._snackBar.open(value, "close");
      })
    ).subscribe()
    
  }
  
}
