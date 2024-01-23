// seeker.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../../service/map.service';
import { ClassCardComponentComponent } from '../../components/class-card-component/class-card-component.component';
import { CommonModule } from '@angular/common';
import { ClassFormComponent } from '../../components/class-form/class-form.component';
import { PetitionComponent } from '../../components/petition/petition.component';
import { ClassService } from '../../service/class.service';

@Component({
  selector: 'app-seeker',
  standalone: true,
  imports: [ClassFormComponent, CommonModule, ClassCardComponentComponent, PetitionComponent],
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css'],
})
export class SeekerComponent implements OnInit, AfterViewInit {
  mapWidth: number = 1000;
  classes: any[] = [];
  showClassForm: boolean = false;

  constructor(
    private mapService: MapService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    if (this.mapService.isPlatformBrowser()) {
      this.mapService.getCurrentLocation().then(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.mapService.initializeMap(latitude, longitude).then(() => {
            this.mapService.setInitialLocation(latitude, longitude);
            this.mapService.updateMapLocation(latitude, longitude);
            this.mapService.addCustomMarker(latitude, longitude);
            this.mapService.adjustMapSize();
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

   
    this.refreshClasses();
  }

  ngAfterViewInit() {
    this.mapService.adjustMapSize();
  }

  onSearch() {
    
  }

  openClassFormDialog(): void {
    this.showClassForm = true;
  }

  closeClassFormDialog(): void {
    this.showClassForm = false;
  }

  refreshClasses() {
    // Llama al servicio para obtener las clases
    this.classes = this.classService.getClasses();
  }
}
