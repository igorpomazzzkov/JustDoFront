import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainComponent } from './main.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AppMaterialModule } from '../app-material.module';
import { DoersComponent } from './components/doers/doers.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './components/filter/filter.component';
import { FilterDialogComponent } from './components/tasks/filter-dialog/filter-dialog.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddtaskDialogComponent } from './components/addtask-dialog/addtask-dialog.component';

@NgModule({
  declarations: [
    MainComponent,
    TasksComponent,
    CategoriesComponent,
    DoersComponent,
    TaskComponent,
    FilterComponent,
    FilterDialogComponent,
    AddtaskComponent,
    AddtaskDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
