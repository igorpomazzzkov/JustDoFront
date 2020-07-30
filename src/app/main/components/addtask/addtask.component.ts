import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../../../entity/region';
import { City } from '../../../entity/city';
import { Category } from '../../../entity/category';
import { Subcategory } from '../../../entity/subcategory';
import { Task } from '../../../entity/task';
import { CategoriesService } from '../../../services/categories.service';
import { RegionsService } from '../../../services/regions.service';
import { TaskService } from '../../../services/tasks.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/entity/user';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  @Input()
  taskFromUser: Task;
  user: User;

  cityLabel = 'Город';
  task:Task;

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

  constructor(private categoriesService: CategoriesService,
    private regionService: RegionsService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private userService: UsersService,
    private taskService: TaskService) {
      this.taskForm = this.formBuilder.group({
        name: '',
        description: '',
        price: 0,
        completion: Date
      });
    }

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe(data => {
      this.categories = data;
    });

    this.regionService.findAll().subscribe(data =>{
      this.regions = data;
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
    if(this.region.name === 'г. Минск'){
      this.cityLabel = 'Район';
    } else {
      this.cityLabel = 'Город';
    }
    this.cities = this.region.cities;
  }

  subcategoryChange(subcategory: Subcategory){
    this.subcategory = subcategory;
  }

  cityChange(city: City){
    this.city = city;
  }

  onSubmit(customerData){
    this.task = customerData;
    this.task.subcategory = this.subcategory;
    this.task.city = this.city;
    this.task.customer = this.user;
    this.taskService.addTask(this.task).subscribe(data => {
      if(data.id != null){
        this.snack.open("success", "ok");
      } else{
        this.snack.open("error", "ok");
      }
    })
  }
}
