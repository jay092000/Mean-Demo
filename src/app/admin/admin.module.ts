import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
  },
];
@NgModule({
  declarations: [DashbordComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
