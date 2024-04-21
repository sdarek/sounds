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
    { title: 'Camera', description: 'High quality camera for photography.', imageUrl: '../../assets/images/equip1.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: '../../assets/images/equip1.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: '../../assets/images/equip1.jpg' },
    { title: 'Microphone', description: 'Studio recording microphone.', imageUrl: '../../assets/images/equip1.jpg' },
  ];
}
