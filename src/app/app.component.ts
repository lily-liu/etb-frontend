import {Component} from '@angular/core';
import {Marker} from '../model/Marker';
import {MarkerService} from '../services/MarkerService';
import { DirectionsMapDirective } from '../directives/directions-map.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService],
})

export class AppComponent {
  // google maps zoom level
  zoom: number = 8;

  markers: Marker[];

  newlabel: string;
  newdesc: string;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  mark: Marker;

  routeDisable: boolean = true;

  init: boolean = true;
  origin = null;
  destination = null;

  constructor(private markerService: MarkerService) {
    markerService.getMarkers()
      .subscribe(
        markers => {
          this.markers = markers
        },
        () => console.log('Completed!')
      );
  }

  public clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${this.origin} ${this.destination}`)
  }

  public addAsStart(start: Marker) {
    this.origin = start;
    console.log(this.origin);
    this.getMarkers()
  }

  public addAsEnd(end: Marker) {
    this.destination = end;
    this.routeDisable = false;
    console.log(this.destination);
    this.getMarkers()
  }

  public deleteMarker(id: number) {
    this.markerService.deleteMarker(id)
      .subscribe(
        () => this.getMarkers()
      )
  }

  public calculateRoute() {
    this.routeDisable = false;
    console.log(`get route for: ${this.origin} ${this.destination}`)
  }

  public removeRoute() {
    this.destination = null;
    this.origin = null;
    this.getMarkers();
    console.log(`route removed: ${this.origin} ${this.destination}`)
  }

  public addMarker(title: string, description: string) {
    this.mark.description = description;
    this.mark.title = title;
    console.log(this.mark);
    this.markerService.createMarker(this.mark)
      .subscribe(
        () => this.getMarkers()
      );

  }

  public getMarkers() {
    this.markerService.getMarkers()
      .subscribe(
        markers => {
          this.markers = markers
        },
        () => console.log('Reloaded!')
      );
  }

  public mapClicked($event: any) {
    this.mark = new Marker($event.coords.lat, $event.coords.lng);
    console.log(this.mark)
  }

}
