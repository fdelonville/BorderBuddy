import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayMonthComponent} from "./components/display-month/display-month.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {CreatePeriodComponent} from "./components/create-period/create-period.component";
import {UploadComponent} from "./components/upload/upload.component";

const routes: Routes = [
  {path:'recap', component: DisplayMonthComponent},
  {path:'accueil', component: AccueilComponent},
  {path:'init', component: CreatePeriodComponent},
  {path:'upload', component: UploadComponent},
  {path:'', component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
