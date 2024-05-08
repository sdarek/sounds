import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hello',
  standalone: true,
    imports: [CommonModule, MatAnchor, RouterLink, MatButtonModule],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {

}
