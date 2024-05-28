import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  offerItems = [
    { title: 'Camera', description: 'High quality camera for photography.'},
    { title: 'Camera', description: 'High quality camera for photography.'},
    { title: 'Camera', description: 'High quality camera for photography.'},
    { title: 'Camera', description: 'High quality camera for photography.'},
  ];

}
