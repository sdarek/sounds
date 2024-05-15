/*auth.routes.ts*/
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { EquipmentComponent } from './features/equipment/equipment.component';
import { OfferComponent } from './features/offer/offer.component';
import { ContactComponent } from './features/contact/contact.component';
import { ReservationComponent } from './features/reservation/reservation.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

import { AuthGuard } from "./core/guards/auth/auth.guard";
import {UserManagementComponent} from "./features/user-management/user-management.component";

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'equipment', component: EquipmentComponent },
    { path: 'offer', component: OfferComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-management', component: UserManagementComponent },

    {
      path: 'dashboard',
      loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      //canActivate: [AuthGuard]
    },


    // { path: '**', component: PageNotFoundComponent },

];
