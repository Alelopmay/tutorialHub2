import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Class } from '../../model/class';
import { CommonModule } from '@angular/common';
import { PetitionComponent } from '../petition/petition.component';
import { ClassExpansionComponent } from '../class-expansion/class-expansion.component';
import { MapService } from '../../service/map.service';

@Component({
  selector: 'app-class-card-component',
  standalone: true,
  imports: [CommonModule, ClassExpansionComponent],
  templateUrl: './class-card-component.component.html',
  styleUrls: ['./class-card-component.component.css']
})
export class ClassCardComponentComponent implements OnInit {
  @Input() classData!: Class;

  isExpanded = false;
  isPetitionVisible = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
   
  }

  confirmDelete(): void {
    const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta clase?');
    if (isConfirmed) {
      console.log('Clase eliminada');
    }
  }

  editClass(): void {
    console.log('Modificar clase');
  }

  expandCard(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded && this.classData?.location) {
      const { latitude, longitude } = this.classData.location;
      if (latitude !== undefined && longitude !== undefined) {
        this.mapService.initializeMap(latitude, longitude).then(() => {
          this.mapService.adjustMapSize();
          this.mapService.addCustomMarker(latitude, longitude);
        });
      } else {
        // Puedes manejarlo según tus necesidades si no hay ubicación específica
      }
    } else {
      this.mapService.destroyMap();
    }
  }

  closePopup(): void {
    this.isExpanded = false;
    this.mapService.destroyMap();
  }

  truncateText(text: string, maxChars: number): string {
    return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
  }
}
