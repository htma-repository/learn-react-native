export class Place {
  constructor(
    public title: string,
    public address: string,
    public image: string,
    public location: { latitude: number; longitude: number },
    public id?: string
  ) {
    this.id = new Date().toISOString() + Math.random().toString();
    this.title = title;
    this.address = address;
    this.image = image;
    this.location = location;
  }
}
