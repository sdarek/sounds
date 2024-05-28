import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import {AuthService, User} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-hello',
  standalone: true,
    imports: [CommonModule, MatAnchor, RouterLink, MatButtonModule],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    })
  }

}
