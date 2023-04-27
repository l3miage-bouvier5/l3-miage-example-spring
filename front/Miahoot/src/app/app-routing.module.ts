import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAdresseMailComponent } from './login-with-adresse-mail/login-with-adresse-mail.component';
import { LoggedComponent } from './logged/logged.component';
import { MiahootChoiceComponent } from './miahoot-choice/miahoot-choice.component';

const routes: Routes = [
  {path:"", component: AccueilComponent},
  {path: "loginWithAdresseMail", component: LoginWithAdresseMailComponent},
  {path: "miahootChoice", component: MiahootChoiceComponent},
  {path: "logged", component: LoggedComponent},
  {path:"**", component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
