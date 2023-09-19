import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GuestGuard } from 'src/app/core/guards/guest.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate : [GuestGuard]
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
