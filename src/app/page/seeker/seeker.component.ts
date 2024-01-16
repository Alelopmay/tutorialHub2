// seeker.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../../service/map.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seeker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css'],
})
export class SeekerComponent implements OnInit, AfterViewInit {
  mapWidth: number = 1000; // Puedes ajustar esto según tus necesidades

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.initializeMap();

    if (this.mapService.isPlatformBrowser()) {
      this.mapService.getCurrentLocation().then(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.mapService.setInitialLocation(latitude, longitude);
          this.mapService.updateMapLocation(latitude, longitude);
          this.mapService.adjustMapSize();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  ngAfterViewInit() {
    this.mapService.adjustMapSize();
  }

  onSearch() {
    // Realizar acciones de búsqueda si es necesario
  }
}
