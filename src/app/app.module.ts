import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AgmCoreModule} from "angular2-google-maps/core";

import {TabsModule} from 'ng2-bootstrap';
import {SortableModule} from 'ng2-bootstrap'
import {ButtonsModule} from 'ng2-bootstrap';
import {ModalModule} from 'ng2-bootstrap';
import {TypeaheadModule} from 'ng2-bootstrap';
import {DirectionsMapDirective} from 'directives/directions-map.directive';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    SortableModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDra73QA7pN58wHXEklXSs5D_fypgRy8B8'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
