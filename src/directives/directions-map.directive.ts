import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
declare var google: any;



@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin;
  @Input() destination;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnChanges(){
    this.gmapsApi.getNativeMap().then(map => {
      if(!this.origin || !this.destination){
        this.directionsDisplay.setDirections({routes: []});
        return;
      }
      if(!this.origin.lng || !this.origin.lat || !this.destination.lng || !this.destination.lat ){
        this.directionsDisplay.setDirections({routes: []});
        return;
      }
      var directionsService = new google.maps.DirectionsService;
      var me = this;
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setDirections({routes: []});
      directionsService.route({
        origin: {lat: this.origin.lat, lng: this.origin.lng},
        destination: {lat: this.destination.lat, lng: this.destination.lng},
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
}
