// class.service.ts
import { Injectable } from '@angular/core';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private classes: Class[] = [];

  addClass(newClass: Class): void {
    this.classes.push(newClass);
  }

  getClasses(): Class[] {
    return this.classes;
  }

  getClassById(classId: number): Class | undefined {
    return this.classes.find((c) => c.id === classId);
  }

  // Otros métodos del servicio si es necesario
}
