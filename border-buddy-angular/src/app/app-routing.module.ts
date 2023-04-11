import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayMonthComponent} from "./components/display-month/display-month.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {UploadComponent} from "./components/upload/upload.component";
import {ChooseTypeComponent} from "./components/choose-type/choose-type.component";

const routes: Routes = [
  {path:'recap', component: DisplayMonthComponent},
  {path:'accueil', component: AccueilComponent},
  {path:'upload', component: UploadComponent},
  {path:'type', component: ChooseTypeComponent},
  {path:'', component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
