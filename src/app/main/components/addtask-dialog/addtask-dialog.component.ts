import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from '../../../entity/task';
import { Region } from '../../../entity/region';
import { City } from '../../../entity/city';
import { Category } from '../../../entity/category';
import { Subcategory } from '../../../entity/subcategory';
import { CategoriesService } from '../../../services/categories.service';
import { RegionsService } from '../../../services/regions.service';
import { TaskService } from '../../../services/tasks.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/entity/user';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addtask-dialog',
  templateUrl: './addtask-dialog.component.html',
  styleUrls: ['./addtask-dialog.component.scss']
})

export class AddtaskDialogComponent implements OnInit {
  task: Task;

  user: User;

  cityLabel = 'Город';

  taskForm: FormGroup;

  taskName:string = '';
  description:string = '';

  regions: Region[];
  region: Region;

  cities: City[];
  city: City;

  categories: Category[];
  category: Category;

  subcategories: Subcategory[];
  subcategory: Subcategory;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddtaskDialogComponent>,
  private categoriesService: CategoriesService,
    private regionService: RegionsService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private userService: UsersService,
    private taskService: TaskService) {
    this.task = data.task;
    console.log(this.task);
    this.cityLabel = this.task.city.name;
    this.taskForm = this.formBuilder.group({
      name: this.task.name,
      description: this.task.description,
      price: this.task.price,
      completion: Date.parse(this.task.completion.toString())
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.dialogRef.close(this.task);
  }

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe(data => {
      this.categories = data;
      this.subcategory = this.task.subcategory;
      this.category = this.categories.find(cat => {
        return cat.subcategories.find(s => s.id === this.task.subcategory.id)
      });
    });


    this.regionService.findAll().subscribe(data =>{
      this.regions = data;
      this.city = this.task.city;
      this.region = this.regions.find(reg => {
        return reg.cities.find(c => c.id === this.task.city.id)
      });
    });

    this.userService.findUserById(1).subscribe(data => {
      this.user = data;
    })
  }

  categoryChange(cat: Category){
    this.category = cat;
    this.subcategories = this.category.subcategories;
  }

  regionChange(region: Region){
    this.region = region;
    this.cities = this.region.cities;
  }

  subcategoryChange(subcategory: Subcategory){
    this.subcategory = subcategory;
  }

  cityChange(city: City){
    this.city = city;
  }

  onSubmit(customerData){
    let id = this.task.id;
    this.task = customerData;
    this.task.id = id;
    this.task.subcategory = this.subcategory;
    this.task.city = this.city;
    this.task.customer = this.user;
    this.taskService.editTask(this.task).subscribe(data => {
      if(data.id != null){
        this.snack.open("success", "ok");
        this.dialogRef.close(data);
      } else{
        this.snack.open("error", "ok");
      }
    })
  }
}
