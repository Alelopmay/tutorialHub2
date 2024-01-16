import { Component, OnInit } from '@angular/core';
import { PetitionListComponent } from '../../components/petition-list/petition-list.component';
import { CommonModule } from '@angular/common';
import { Petition } from '../../model/petition';
import { PetitionService } from '../../service/petition.service';
import { PetitionComponent } from '../../components/petition/petition.component';

@Component({
  selector: 'app-mailbox',
  standalone: true,
  imports: [PetitionListComponent, CommonModule, PetitionComponent],
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  petitions: Petition[] = [];

  constructor(private petitionService: PetitionService) { }

  ngOnInit(): void {
    this.petitionService.getPetitions().subscribe((petitions) => {
      this.petitions = petitions;
    });
  }
}
