import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {HelloComponent} from "./hello/hello.component";
import {RecordingsComponent} from "./recordings/recordings.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {AccountComponent} from "./account/account.component";
import {ReservationComponent} from "./reservation/reservation.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'hello', component: HelloComponent },
      { path: 'recordings', component: RecordingsComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'account', component: AccountComponent },
      { path: '', redirectTo: 'hello', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
