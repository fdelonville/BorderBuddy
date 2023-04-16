import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayMonthComponent} from "./components/display-month/display-month.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {UploadComponent} from "./components/upload/upload.component";
import {ChooseTypeComponent} from "./components/choose-type/choose-type.component";
import {DisplayDocsComponent} from "./components/display-docs/display-docs.component";
import {Page404Component} from "./components/page404/page404.component";

const routes: Routes = [
  {path:'recap', component: DisplayMonthComponent},
  {path:'accueil', component: AccueilComponent},
  {path:'upload', component: UploadComponent},
  {path:'type', component: ChooseTypeComponent},
  {path:'docs', component: DisplayDocsComponent},
  {path:'**',component: Page404Component},
  {path:'', component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
