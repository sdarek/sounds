import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatListModule } from '@angular/material/list'; 
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {
  equipmentItems = [
    { title: 'Camera', description: 'High quality camera for photography.', imageUrl: 'path/to/camera.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: 'path/to/microphone.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: 'path/to/microphone.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: 'path/to/microphone.jpg' },
  ];
}
