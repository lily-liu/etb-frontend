import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import {Directive, Input} from '@angular/core';
declare var google: any;


@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() startPoint;
  @Input() endPoint;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngOnChanges() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.startPoint || !this.endPoint) {
        this.directionsDisplay.setDirections({routes: []});
        console.log('map empty')
        return;
      }
      if (!this.startPoint.lat || !this.startPoint.long || !this.endPoint.lat || !this.endPoint.long) {
        this.directionsDisplay.setDirections({routes: []});
        return;
      }
      var directionsService = new google.maps.DirectionsService;
      var me = this;
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setDirections({routes: []});
      directionsService.route({
        origin: {lat: this.startPoint.lat, lng: this.startPoint.long},
        destination: {lat: this.endPoint.lat, lng: this.endPoint.long},
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
}
