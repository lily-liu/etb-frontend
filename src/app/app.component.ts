import {Component} from '@angular/core';
import {Marker} from '../model/Marker'
import {MarkerService} from '../services/MarkerService'

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

  // initial center position for the map
  lat: number = 51.673858;
  long: number = 7.815982;

  mark: Marker;

  routeDisable: boolean = true;

  init: boolean = true;
  startPoint = null;
  endPoint = null;

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
    console.log(`clicked the marker: ${this.startPoint} ${this.endPoint}`)
  }

  public addAsStart(start: Marker) {
    this.startPoint = start;
    console.log(this.startPoint);
    this.getMarkers()
  }

  public addAsEnd(end: Marker) {
    this.endPoint = end;
    this.routeDisable = false;
    console.log(this.endPoint);
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
    console.log(`get route for: ${this.startPoint} ${this.endPoint}`)
  }

  public removeRoute() {
    this.endPoint = null;
    this.startPoint = null;
    this.getMarkers();
    console.log(`route removed: ${this.startPoint} ${this.endPoint}`)
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
    this.mark = new Marker($event.coords.lat, $event.coords.lng)
    console.log(this.mark)
  }

}
