import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Class } from '../../model/class';
import { ClassService } from '../../service/class.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {
  @Output() close = new EventEmitter<void>();
  formData: any = {
    id: '',
    description: '',
    type: '',
    category: '',
    location: { latitude: 0, longitude: 0 },
    direction: '',
    postalCode: '',
    province: '',
    teacherId: '',
    duration: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  locationActivatedMessage: string = '';

  constructor(private classService: ClassService) { }

  closeClassForm(): void {
    this.close.emit();
  }

  activateLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.formData.location.latitude = position.coords.latitude;
        this.formData.location.longitude = position.coords.longitude;

        // Log para verificar la ubicación
        console.log('Ubicación:', this.formData.location);

        this.locationActivatedMessage = 'Ubicación activada con éxito';
      });
    } else {
      console.error('Geolocalización no disponible');
      this.locationActivatedMessage = 'Error: La geolocalización no está disponible.';
    }
  }

  submitForm(): void {
    try {
      const newClass = new Class(
        this.formData.description,
        this.formData.type,
        this.formData.category,
        this.formData.location,
        this.formData.direction,
        this.formData.postalCode,
        this.formData.province,
        this.formData.teacherId,
        this.formData.duration,
        this.formData.localidad
      );


      // Log para verificar la ubicación en la nueva clase
      console.log('Ubicación en nueva clase:', newClass.location);

      this.classService.addClass(newClass);

      this.successMessage = 'Clase creada con éxito';
      this.errorMessage = '';

      this.clearFormFields();
    } catch (error) {
      this.errorMessage = 'Error al crear la clase';
      this.successMessage = '';
    }
  }

  clearFormFields(): void {
    this.formData = {
      id: '',
      description: '',
      type: '',
      category: '',
      location: { latitude: 0, longitude: 0 },
      direction: '',
      postalCode: '',
      province: '',
      teacherId: '',
      duration: ''
    };
  }
}
