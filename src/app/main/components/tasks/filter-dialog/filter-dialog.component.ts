import { Component, OnInit, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from '../../../../entity/task';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit{

  @Output()
  tasksToUp: EventEmitter<Task[]> = new EventEmitter();

  tasks: Task[];

  ngOnInit(): void {

  }

  taskHandler($event){
    this.tasks = $event;
    this.dialogRef.close(this.tasks);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FilterDialogComponent>){ }

  onNoClick(): void {
    console.log(this.tasks);
    this.dialogRef.close(this.tasks);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log("ESCAPE");
    this.dialogRef.close(this.tasks);
  }
}
