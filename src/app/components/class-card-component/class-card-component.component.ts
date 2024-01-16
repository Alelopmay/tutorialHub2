// class-card-component.component.ts
import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../service/map.service';
import { Class } from '../../model/class';
import { PetitionComponent } from '../petition/petition.component';

@Component({
  selector: 'app-class-card-component',
  standalone: true,
  imports: [CommonModule, PetitionComponent],
  templateUrl: './class-card-component.component.html',
  styleUrls: ['./class-card-component.component.css']
})
export class ClassCardComponentComponent implements OnInit, OnDestroy {
  @Input() classData!: Class;

  isExpanded = false;
  isPetitionVisible = false;
  @ViewChild('expandedContent') expandedContent!: ElementRef;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.setInitialLocation(40.7128, -74.0060);
  }

  ngOnDestroy(): void {
    this.mapService['destroyMap']();
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
    this.isExpanded = true;

    this.mapService.initializeMap().then(() => {
      this.mapService.adjustMapSize();
      this.mapService.createMap('map');

      if (this.classData?.location) {
        const { latitude, longitude } = this.classData.location;

        if (latitude !== undefined && longitude !== undefined) {
          this.mapService.addMarker(latitude, longitude);
          this.mapService.updateMapLocation(latitude, longitude);
        } else {
          // Puedes manejarlo según tus necesidades si no hay ubicación específica
        }
      }
    });
  }

  closePopup(): void {
    this.isExpanded = false;
  }

  togglePetitionVisibility(): void {
    this.isPetitionVisible = !this.isPetitionVisible;
  }

  truncateText(text: string, maxChars: number): string {
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + '...';
    } else {
      return text;
    }
  }
}
