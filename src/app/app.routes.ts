import { Routes, RouterModule } from '@angular/router';
import { Problem2Component } from './Controllers/Service/Problem2Ctrl';
import { HomeComponent } from './Controllers/HomeCtrl';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'problem_second_payment', component: Problem2Component}
];

export const Routing = RouterModule.forRoot(routes);
