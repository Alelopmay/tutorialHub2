import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './page/class/class.component';
import { MailboxComponent } from './page/mailbox/mailbox.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SeekerComponent } from './page/seeker/seeker.component';

export const routes: Routes = [
    { path: 'class', component: ClassComponent },
    { path: 'seeker', component: SeekerComponent },
    { path: 'mailbox', component: MailboxComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/class', pathMatch: 'full' }, // Redirige a '/class' por defecto
    // Puedes agregar más rutas según sea necesario
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
