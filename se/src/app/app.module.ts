import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule,MatIconModule ,MatFormFieldModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { StorageServiceModule } from 'angular-webstorage-service';
import { FeedService } from './feed.service';
import { KeyupDirective } from './keyup.directive';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GraphComponent } from './graph/graph.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    KeyupDirective,
    AnalyticsComponent,
    GraphComponent,
    DoughnutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule, 
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    StorageServiceModule,
    RatingModule,
    MatFormFieldModule,
    ChartsModule
  ],
  providers: [FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
