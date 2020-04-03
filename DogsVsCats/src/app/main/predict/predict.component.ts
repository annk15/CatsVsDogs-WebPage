import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ButtonStates} from "../button.states";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictComponent implements OnInit {

  private static assetsPath : string = "../../../";
  private predictedLabel : string;

  constructor(private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.predictedLabel = params['label'];
      })

  }

  getLabel():string {
    var formatedLabel : string;

    if (this.predictedLabel == "cat") {
      formatedLabel = "Cat"

    } else if (this.predictedLabel == "dog") {
      formatedLabel = "Dog"
    }

    return formatedLabel;
  }

  getImgPath(): string {

    var path : string;

    if (this.predictedLabel == "cat") {
      path = PredictComponent.assetsPath + "assets/cat.svg"

    } else if (this.predictedLabel == "dog") {
      path = PredictComponent.assetsPath + "assets/dog.svg"

    }

    return path;

  }

  getButtonState() : ButtonStates { return ButtonStates.Return; }

}
