import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAdresseMailComponent } from './login-with-adresse-mail/login-with-adresse-mail.component';
import { ConceptionMiahootComponent } from './conception-miahoot/conception-miahoot.component';
import { LoggedComponent } from './logged/logged.component';
import { MiahootChoiceComponent } from './miahoot-choice/miahoot-choice.component';
import { ParticipantComponent } from './participant/participant.component';
import { ResultatsComponent } from './resultats/resultats.component';
import { IdMiahootComponent } from './id-miahoot/id-miahoot.component';



const routes: Routes = [
  {path:"", component: AccueilComponent},
  {path: "loginWithAdresseMail", component: LoginWithAdresseMailComponent},
  {path: "miahootChoice", component: MiahootChoiceComponent},
  {path: "logged", component: LoggedComponent},
  {path:"conceptionMiahoot", component: ConceptionMiahootComponent},
  {path : "participer", component: ParticipantComponent},
  {path : "resultats", component : ResultatsComponent},
  {path : "id-miahoot", component : IdMiahootComponent},
  {path:"**", component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
