import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAdresseMailComponent } from './login-with-adresse-mail/login-with-adresse-mail.component';
import { ConceptionMiahootComponent } from './conception-miahoot/conception-miahoot.component';

const routes: Routes = [
  {path:"", component: AccueilComponent},
  {path:"loginWithAdresseMail", component: LoginWithAdresseMailComponent},
  {path:"conceptionMiahoot", component: ConceptionMiahootComponent},
  {path:"**", component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
