import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../entity/task';
import { TaskService } from '../../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.findAll().subscribe(data => {
      this.tasks = data;
    });
  }

  taskHandler($event){
    this.tasks = $event;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      panelClass: 'filter-dialog',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tasks = result;
    });
  }
}
