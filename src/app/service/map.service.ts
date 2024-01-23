import { Injectable, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: any;
  private initialLat: number | null = null;
  private initialLng: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) { }

  initializeMap(latitude: number, longitude: number): Promise<void> {
    return new Promise<void>((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        // Importa Leaflet solo en el entorno del navegador
        import('leaflet').then((L) => {
          if (this.map) {
            this.destroyMap();
          }

          this.map = L.map('map').setView([latitude, longitude], 15);

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
  clearMarkers(): void {
    this.destroyMap();
    this.initializeMap(this.initialLat || 0, this.initialLng || 0);
    this.addCustomMarker(this.initialLat || 0, this.initialLng || 0);
    this.adjustMapSize();
  }



  destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  setInitialLocation(latitude: number, longitude: number) {
    this.initialLat = latitude;
    this.initialLng = longitude;
  }

  createMap(containerId: string, latitude: number, longitude: number): void {
    if (isPlatformBrowser(this.platformId) && this.map) {
      // Importa Leaflet solo en el entorno del navegador
      import('leaflet').then((L) => {
        this.map = L.map(containerId).setView([latitude, longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'OpenStreetMap',
        }).addTo(this.map);
      });
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

  addCustomMarker(latitude: number, longitude: number): void {
    if (isPlatformBrowser(this.platformId) && this.map) {
      // Importa Leaflet solo en el entorno del navegador
      import('leaflet').then((L) => {
        const customIcon = L.icon({
          iconUrl: '/assets/foto/geo.svg', // Ajusta la ruta según la ubicación de tu icono
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map);
      });
    }
  }


}
