export class Place {
  constructor(
    public title: string,
    public address: string,
    public imageUri: string,
    public location: { lat: number; lng: number },
    public id?: string
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.imageUri = imageUri;
    this.location = location;
  }
}
