export class BackendResponse {

  label: string;
  certainty: number;

  public constructor(init?:Partial<BackendResponse>) {
    Object.assign(this, init);
  }
}
