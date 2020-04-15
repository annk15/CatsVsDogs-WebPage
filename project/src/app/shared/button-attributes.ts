export class ButtonAttributes {

  icon : string = "none";
  text : string = "none";
  route : string = "none";
  fileDialog : boolean = false;

  public constructor(init?:Partial<ButtonAttributes>) {
    Object.assign(this, init);
  }
}
