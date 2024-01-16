import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Petition } from '../../model/petition';
import { PetitionService } from '../../service/petition.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-petition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.css']
})
export class PetitionComponent {
  @Input() isPetitionVisible = true;
  @Output() petitionSubmitted = new EventEmitter<Petition>();
  @Input() petition: Petition | undefined;
  petitionForm: FormGroup;
  showConfirmation: boolean = false; // Variable para controlar la visibilidad del mensaje de confirmación

  constructor(private petitionService: PetitionService, private fb: FormBuilder) {
    this.petitionForm = this.fb.group({
      message: ['', Validators.required],
      state: [null],
      userId: [1, Validators.required],
      classroomId: [1, Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  get petitionFormControls() {
    return this.petitionForm.controls;
  }

  setCreationDate(): void {
    this.petitionForm.controls['date'].setValue(new Date());
  }

  submitPetition(): void {
    if (this.petitionForm.valid) {
      const newPetition: Petition = {
        id: -1,
        message: this.petitionForm.value.message,
        state: this.petitionForm.value.state,
        date: this.petitionForm.value.date,
        userId: this.petitionForm.value.userId,
        classId: this.petitionForm.value.classroomId,
        classInfo: []
      };

      this.petitionService.addPetition(newPetition).subscribe(() => {
        this.petitionSubmitted.emit(newPetition);
        this.showConfirmation = true; // Mostrar mensaje de confirmación
        // Puedes realizar otras acciones después de enviar la petición
      });
    }
  }
}
