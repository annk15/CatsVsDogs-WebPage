import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadComponent} from "./main/upload/upload.component";
import {PredictComponent} from "./main/predict/predict.component";

const routes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'predict', component: PredictComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
