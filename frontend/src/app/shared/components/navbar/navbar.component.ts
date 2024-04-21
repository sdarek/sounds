import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService, NavLink } from '../../../core/services/navbar/navbar.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  navLinks: NavLink[] = [];
  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.getLinks().subscribe(links => {
      this.navLinks = links;
    });
  }
}