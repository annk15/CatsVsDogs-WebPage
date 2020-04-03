import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessComponent} from "./main/process/process.component";
import {AppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";
import {UploadComponent} from "./main/upload/upload.component";
import {PredictComponent} from "./main/predict/predict.component";

const routes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'process', component: ProcessComponent},
  {path: 'predict', component: PredictComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
