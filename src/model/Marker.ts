export class Marker {
  id : number;
  title : string;
  description : string;
  lat : number;
  long : number;

  constructor(lat:number, long: number) {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.lat = lat;
    this.long = long;
  }
}
