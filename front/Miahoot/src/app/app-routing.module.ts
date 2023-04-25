import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionAnonymeComponent } from './connexion-anonyme/connexion-anonyme.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {path:"", component: AccueilComponent},
  {path:"connexionAnonyme",component: ConnexionAnonymeComponent},
  {path:"connexion", component: ConnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
