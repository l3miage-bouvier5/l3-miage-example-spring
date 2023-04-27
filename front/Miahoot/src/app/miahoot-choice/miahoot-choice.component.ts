import { Component } from '@angular/core';
import { Miahoot } from '../miahoot';

@Component({
  selector: 'app-miahoot-choice',
  templateUrl: './miahoot-choice.component.html',
  styleUrls: ['./miahoot-choice.component.scss']
})
export class MiahootChoiceComponent {
  // Récupérer tous les miahoots de la base de données et les afficher
  miahoots : Miahoot[] = [
    {
      nom: "La premier QCM",
      questions: [
        {
          label: "Comment s'appelle le professeur de SI ?",
          reponses: [
            {
              label: " JMF ",
              estValide: true
            },
            {
              label: " JMV ",
              estValide: false
            },
            {
              label: "JUL",
              estValide: false
            }
          ]
        },
        {
          label: "Quelle est la couleur du cheval blanc d'Henri IV ?",
          reponses: [
            {
              label: "Blanc",
              estValide: true
            },
            {
              label: "Noir",
              estValide: false
            },
            {
              label: "Rouge",
              estValide: false
            }
          ]
        }
      ]
    }
  ]
}
