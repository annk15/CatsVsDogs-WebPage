export class ButtonAttributes {

  text : string = "none";
  route : string = "none";

  public constructor(init?:Partial<ButtonAttributes>) {
    Object.assign(this, init);
  }
}
