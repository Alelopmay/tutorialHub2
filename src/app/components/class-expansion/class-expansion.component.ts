// class-expansion.component.ts
import { Component, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MapService } from '../../service/map.service';
import { Class } from '../../model/class';
import { CommonModule } from '@angular/common';
import { PetitionComponent } from '../petition/petition.component';

@Component({
  selector: 'app-class-expansion',
  standalone: true,
  imports: [CommonModule, PetitionComponent],
  templateUrl: './class-expansion.component.html',
  styleUrls: ['./class-expansion.component.css']
})
export class ClassExpansionComponent implements AfterViewInit, OnDestroy {
  @Input() classData!: Class;
  @Output() closePopupEvent = new EventEmitter<void>();

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.setupMap();
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  closePopup(): void {
    this.closePopupEvent.emit();
    this.mapService.destroyMap();
  }

  truncateText(text: string, maxChars: number): string {
    return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
  }

  private setupMap(): void {
    if (this.classData?.location) {
      const { latitude, longitude } = this.classData.location;
      if (latitude !== undefined && longitude !== undefined) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          this.mapService.destroyMap();
          console.log('Map container:', mapContainer);
          this.mapService.createMap('map', latitude, longitude);
          this.mapService.adjustMapSize();
          this.mapService.addCustomMarker(latitude, longitude);
        } else {
          console.error('Map container not found.');
        }
      } else {
        
      }
    }
  }



}
