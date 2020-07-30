import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../entity/task';
import { UsersService } from '../../../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../entity/user';
import { Region } from '../../../../entity/region';
import { RegionsService } from '../../../../services/regions.service';
import { TaskService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskDialogComponent } from '../../addtask-dialog/addtask-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private http: HttpClient,
    private taskService: TaskService,
    private regionsService: RegionsService,
    private usersService: UsersService,
    private dialog: MatDialog) { }

  @Input()
  task: Task;

  @Output()
  tasks: EventEmitter<Task[]> = new EventEmitter();

  user: User;

  region: string;

  taskFromDB: Task[];

  ngOnInit(): void {
    this.regionsService.findRegionByCity(this.task.city).subscribe(data => {
      this.region = data;
    });
  }

  isTime(): number{
    return this.task.completion.getHours();
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe(data => {
      this.tasks.emit(data);
    });
  }

  update(task: Task){
      const dialogRef = this.dialog.open(AddtaskDialogComponent, {
        panelClass: 'filter-dialog',
        width: '80%',
        data: {
          task
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.task = result;
        console.log(this.task);
      });
  }
}
