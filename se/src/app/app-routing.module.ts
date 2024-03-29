import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './feed/feed.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup' , component: SignupComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: 'profile' , component: ProfileComponent } ,
  { path: 'analytics' , component:AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const RoutingComponents = [ DashboardComponent, FeedComponent, FeedFormComponent, LoginComponent, SignupComponent, NotfoundComponent,AnalyticsComponent,ProfileComponent] 
