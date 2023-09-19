import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard'; // Import your AuthGuard here
import { LoginComponent } from './modules/auth/components/login/login.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
