import { Component, Input, OnInit } from '@angular/core';
import { Petition } from '../../model/petition';
import { PetitionService } from '../../service/petition.service';
import { CommonModule } from '@angular/common';
import { Class } from '../../model/class';
import { ClassService } from '../../service/class.service';

@Component({
    selector: 'app-petition-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './petition-list.component.html',
    styleUrls: ['./petition-list.component.css']
})
export class PetitionListComponent implements OnInit {
    @Input() petitions: Petition[] = [];
    classesMap: Map<number, Class> = new Map(); // Modificado para almacenar objetos de clase directamente

    constructor(private petitionService: PetitionService, private classService: ClassService) { }

    ngOnInit(): void {
        this.populateClassesMap();
    }

    private populateClassesMap(): void {
        // Utiliza el servicio ClassService para obtener las clases correspondientes
        const classIdsToFetch = Array.from(new Set(this.petitions.map(petition => petition.classId)));
        for (const classId of classIdsToFetch) {
            if (!this.classesMap.has(classId)) {
                const classInstance = this.classService.getClassById(classId);
                if (classInstance) {
                    this.classesMap.set(classId, classInstance);
                }
            }
        }
    }

    getClassInfo(classId: number): Class | undefined {
        return this.classesMap.get(classId);
    }

    acceptPetition(petition: Petition): void {
        this.updatePetitionState(petition, true);
    }

    denyPetition(petition: Petition): void {
        this.updatePetitionState(petition, false);
    }

    private updatePetitionState(petition: Petition, newState: boolean): void {
        petition.state = newState;

        this.petitionService.updatePetition(petition).subscribe(() => {
            // Lógica adicional después de la actualización, si es necesario
        });
    }

    toggleExpand(petition: Petition): void {
        petition.expanded = !petition.expanded;
    }

    truncatedMessage(message: string): string {
        const maxLength = 40;
        return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
    }
}
