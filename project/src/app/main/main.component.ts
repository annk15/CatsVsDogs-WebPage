import {Component, OnInit} from '@angular/core';
import {ProcessService} from "../shared/process.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ButtonAttributes} from "../shared/button-attributes";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  processSubscription : Subscription;
  buttonAttributes : ButtonAttributes = new ButtonAttributes();

  constructor(private processService : ProcessService, private router: Router) { }

  ngOnInit(): void {}

  ngOnDestroy() {

    this.processSubscription.unsubscribe();

  }

  onFileSelection(event) {

    var file : File = event.target.files[0];

    if(file) {

       this.processSubscription = this.processService.getPrediction().subscribe( (label) => {
        if(label != null) {
          this.processSubscription.unsubscribe();
          this.navigateToRoute();
        }
      });

      this.processService.predict(file);
    }

  }

  navigateToRoute() { this.router.navigate([this.buttonAttributes.route]); }

  onActivate(ref) {

    if(ref.getButtonAttributes) {
      this.buttonAttributes = ref.getButtonAttributes();
    }
  }

}
