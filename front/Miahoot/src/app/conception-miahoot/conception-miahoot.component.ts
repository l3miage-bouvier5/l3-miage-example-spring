import { Component, OnDestroy, OnInit } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { ConverterService } from '../services/converter.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoggedComponent } from '../logged/logged.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';
import { CurrentMiahootService } from '../services/current-miahoot.service';


@Component({
  selector: 'app-conception-miahoot',
  templateUrl: './conception-miahoot.component.html',
  styleUrls: ['./conception-miahoot.component.scss']
})
export class ConceptionMiahootComponent implements OnInit, OnDestroy{
  readonly bsJSON = new BehaviorSubject<HighlightAutoResult |undefined>(undefined)
  readonly bsCode = new BehaviorSubject<string>("");

  chargement = new BehaviorSubject<boolean>(false)
  bsErrorMessage = new BehaviorSubject<string>("")
  bsInputFile = new BehaviorSubject<string>("")
  bsValide = new BehaviorSubject<boolean>(false)
  code : string = ""

  constructor(private hljsLoader: HighlightLoader,
              readonly cs: ConnexionService,
              readonly conv: ConverterService,
              private _snackBar: MatSnackBar,
              public ms : CurrentMiahootService) {
    this.conv.bsErrorMessage.subscribe(this.bsErrorMessage)
    

    if(this.ms.bsUpdate.value){
      this.code = JSON.stringify(this.ms.bsMiahoot.value, null, "\t");
      this.bsCode.next(this.code)

    }else {
      this.code = `{
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
    this.bsCode.next(this.code)
    }
  }

  onHighlight(e: HighlightAutoResult) {
    this.bsJSON.next(e ? e : undefined);
  }

  ngOnDestroy(): void {
      this.ms.bsUpdate.next(false)
  }

  ngOnInit(): void {
    this.chargement.next(true)

    
    setTimeout(() => {
      this.chargement.next(false)
    }, 2000);
}

  postMiahoot(){
    this.bsValide.next(false);
    this.bsErrorMessage.next("")
    
    if(this.bsJSON.value?.language && this.cs.obsMiahootUser$){
      
      this.cs.obsMiahootUser$.pipe(
        take(1),
        map(async user => {
          // cas de modification ou de création
          if(this.ms.bsUpdate.value){
            try {              
              await this.conv.putMiahoot(user!.uid, this.ms.bsMiahoot.value.nom, this.code);
              this.bsValide.next(true)
              this.bsErrorMessage.next("Modifié !")
              this.openMessage();
            } catch (err: any) {
              if(err){
                this.bsErrorMessage.next(err.error.errorMessage)
                this.openMessage();   
              } else {
                this.bsErrorMessage.next("Erreur sur le format JSON")
                this.openMessage();
              }
              
            }

          }else {
            try {
              await this.conv.postMiahoot(user!.uid, this.code);
              this.bsValide.next(true)
              this.bsErrorMessage.next("Envoyé !")
              this.openMessage();
            } catch (err: any) {
              if(err){
                this.bsErrorMessage.next(err.error.errorMessage)
                this.openMessage();   
              } else {
                this.bsErrorMessage.next("Erreur sur le format JSON")
                this.openMessage();
              }
            }
          }

        })
      ).subscribe();
    }
    
  }


  async onChange(event: any) {
    
    const file: File = event.target.files[0];
    this.code = await file.text();
    this.bsCode.next(this.code)
  }

  openMessage() {
    this.bsErrorMessage.pipe(
      take(1),
      map(value => {
        this._snackBar.open(value, "close");
      })
    ).subscribe()
    
  }
  
}
