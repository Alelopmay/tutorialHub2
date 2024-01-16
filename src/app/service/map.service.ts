// map.service.ts
import { Injectable, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  [x: string]: any;
  private map: any;
  private initialLat: number | null = null;
  private initialLng: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) { }

  initializeMap(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        // Importa Leaflet solo en el entorno del navegador
        import('leaflet').then((L) => {
          this.map = L.map('map').setView([0, 0], 2);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMap',
          }).addTo(this.map);

          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  setInitialLocation(latitude: number, longitude: number) {
    this.initialLat = latitude;
    this.initialLng = longitude;
  }

  createMap(containerId: string): void {
    if (isPlatformBrowser(this.platformId) && this.map) {
      this.map.addTo(document.getElementById(containerId));
    }
  }

  addMarker(latitude: number, longitude: number): void {
    if (isPlatformBrowser(this.platformId) && this.map) {
      // Importa Leaflet solo en el entorno del navegador
      import('leaflet').then((L) => {
        L.marker([latitude, longitude]).addTo(this.map);
      });
    }
  }

  updateMapLocation(latitude: number, longitude: number) {
    if (isPlatformBrowser(this.platformId) && this.map) {
      this.map.setView([latitude, longitude], 15);
    }
  }

  adjustMapSize(): void {
    if (isPlatformBrowser(this.platformId) && this.map) {
      this.ngZone.runOutsideAngular(() => {
        this.map.invalidateSize(false);
      });
    }
  }

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isPlatformBrowser() && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not available in this environment.');
      }
    });
  }
}
