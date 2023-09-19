import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/shared/components/pipes/search.pipe';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, 
  {
    path:'home', component: DashboardComponent
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // SearchPipe
  ]
})
export class DashboardModule { }
