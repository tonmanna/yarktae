import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }
];

export const Routing = RouterModule.forRoot(routes);
