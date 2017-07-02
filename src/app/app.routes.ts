import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";

const routes : Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, {
        path: "home",
        component: HomeComponent,
        // resolve :{
        //     clock : 'clock'
        // }
    }
];

export const Routing = RouterModule.forRoot(routes);
