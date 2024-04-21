import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule 
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  portfolioItems = [
    { title: 'Mix', description: 'Opis procesu mixowania.', videoUrl: 'https://www.youtube.com/watch?v=mU0G_Llg_dU' },
    { title: 'Mix', description: 'Opis procesu mixowania.', videoUrl: 'https://www.youtube.com/watch?v=mU0G_Llg_dU' },
    { title: 'Mix', description: 'Opis procesu mixowania.', videoUrl: 'https://www.youtube.com/watch?v=mU0G_Llg_dU' },
    { title: 'Mix', description: 'Opis procesu mixowania.', videoUrl: 'https://www.youtube.com/watch?v=mU0G_Llg_dU' },
    // Można dodać więcej elementów
  ];
}
