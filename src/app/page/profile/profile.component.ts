import { Component } from '@angular/core';
import { ClassFormComponent } from '../../components/class-form/class-form.component';
import { CommonModule } from '@angular/common';
import { ClassCardComponentComponent } from '../../components/class-card-component/class-card-component.component';
import { ClassService } from '../../service/class.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ClassFormComponent, CommonModule, ClassCardComponentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  showClassForm: boolean = false;
  classes: any[] = [];

  // Inyecta el servicio en el constructor
  constructor(private classService: ClassService) { }

  openClassFormDialog(): void {
    this.showClassForm = true;
  }

  closeClassFormDialog(): void {
    this.showClassForm = false;
  }

  // Actualiza la lista de clases al ngOnInit
  ngOnInit() {
    this.classes = this.classService.getClasses();
  }

  // Modifica la función para agregar una nueva clase
  addClass(newClass: any): void {
    this.classService.addClass(newClass);
    this.classes = this.classService.getClasses(); // Actualiza la lista de clases
  }
}

