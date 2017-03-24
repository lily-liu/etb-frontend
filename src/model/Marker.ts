export class Marker {
  id : number;
  title : string;
  description : string;
  lat : number;
  lng : number;

  constructor(lat:number, lng: number) {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.lat = lat;
    this.lng = lng;
  }
}
