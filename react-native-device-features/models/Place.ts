export class Place {
  constructor(
    public id: string,
    public title: string,
    public address: string,
    public location: { lat: string; long: string }
  ) {
    this.id = new Date().toISOString() + Math.random().toString();
    this.title = title;
    this.address = address;
    this.location = location;
  }
}
