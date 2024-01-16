// petition.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Petition } from '../model/petition';

@Injectable({
  providedIn: 'root',
})
export class PetitionService {
  private petitionsSubject = new BehaviorSubject<Petition[]>([]);
  petitions$ = this.petitionsSubject.asObservable();

  constructor() { }

  addPetition(petition: Petition): Observable<Petition> {
    const currentPetitions = this.petitionsSubject.value;
    const newPetitions = [...currentPetitions, petition];
    this.petitionsSubject.next(newPetitions);

    return new Observable<Petition>((observer) => observer.next(petition));
  }

  getPetitions(): Observable<Petition[]> {
    return this.petitions$;
  }

  updatePetition(petition: Petition): Observable<Petition> {
    const currentPetitions = this.petitionsSubject.value;
    const index = currentPetitions.findIndex((p) => p.id === petition.id);

    if (index !== -1) {
      currentPetitions[index] = petition;
      this.petitionsSubject.next(currentPetitions);
      return new Observable<Petition>((observer) => observer.next(petition));
    } else {
      return new Observable<Petition>((observer) => observer.error('Petition not found'));
    }
  }

  denyPetition(petitionId: number): Observable<void> {
    return new Observable<void>((observer) => {
      const currentPetitions = this.petitionsSubject.value;
      const petition = currentPetitions.find((p) => p.id === petitionId);

      if (petition) {
        petition.state = false;
        this.petitionsSubject.next(currentPetitions);
        observer.next();
      } else {
        observer.error('Petition not found');
      }
    });
  }
}
