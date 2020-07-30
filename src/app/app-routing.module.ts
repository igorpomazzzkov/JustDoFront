import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TasksComponent } from './main/components/tasks/tasks.component';
import { CategoriesComponent } from './main/components/categories/categories.component';
import { DoersComponent } from './main/components/doers/doers.component';
import { AddtaskComponent } from './main/components/addtask/addtask.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {path: 'task', component: AddtaskComponent},
    {path: 'tasks', component: TasksComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
