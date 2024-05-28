import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarService} from "../../../core/services/navbar/navbar.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private navbarService: NavbarService, private router: Router) {}

  ngOnInit() {
    this.navbarService.setDashboardLinks();
  }

  ngOnDestroy() {
    this.navbarService.resetLinks();
  }
}
