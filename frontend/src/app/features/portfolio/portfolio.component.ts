import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule 
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  portfolioItems = [
    { title: 'Mix', description: 'Opis procesu mixowania.' },
    { title: 'Mastering', description: 'Opis procesu masteringu.' },
    // Można dodać więcej elementów
  ];
}
