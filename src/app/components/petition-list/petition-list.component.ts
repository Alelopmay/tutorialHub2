// petition-list.component.ts
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
    classesMap: Map<number, string[]> = new Map();

    constructor(private petitionService: PetitionService, private classService: ClassService) { }

    ngOnInit(): void {
        this.populateClassesMap();
    }

    private populateClassesMap(): void {
        for (const petition of this.petitions) {
            petition.classInfo = this.getClassInfo(petition.classId);
        }
    }

    private getClassInfo(classId: number): string[] {
        const classInfo: string[] = [];

        const classInstance = this.classService.getClassById(classId);

        if (classInstance) {
            classInfo.push(classInstance.description);
            classInfo.push(classInstance.type);
            classInfo.push(classInstance.category);
        }

        return classInfo;
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
}
