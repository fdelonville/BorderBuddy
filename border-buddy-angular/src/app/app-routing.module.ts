import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayMonthComponent} from "./components/display-month/display-month.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {UploadComponent} from "./components/upload/upload.component";
import {ChooseTypeComponent} from "./components/choose-type/choose-type.component";
import {DisplayDocsComponent} from "./components/display-docs/display-docs.component";
import {Page404Component} from "./components/page404/page404.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {LoggedInGuard} from "./guards/logged-in.guard";

const routes: Routes = [
  {path:'recap', component: DisplayMonthComponent, canActivate:[LoggedInGuard]},
  {path:'accueil', component: AccueilComponent},
  {path:'upload', component: UploadComponent, canActivate:[LoggedInGuard]},
  {path:'type', component: ChooseTypeComponent, canActivate:[LoggedInGuard]},
  {path:'docs', component: DisplayDocsComponent, canActivate:[LoggedInGuard]},
  {path: 'logout', component: LogoutComponent, canActivate:[LoggedInGuard]},
  {path:'', component: AccueilComponent},
  {path:'**',component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
