import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { ClassComponent } from './page/class/class.component';
import { SeekerComponent } from './page/seeker/seeker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavComponent,ClassComponent,SeekerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tutorialHub2';
}
