import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Region } from '../../../entity/region';
import { City } from '../../../entity/city';
import { Category } from '../../../entity/category';
import { Subcategory } from '../../../entity/subcategory';
import { Task } from '../../../entity/task';
import { CategoriesService } from '../../../services/categories.service';
import { RegionsService } from '../../../services/regions.service';
import { TaskService } from '../../../services/tasks.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  cityLabel = 'Город';
  buttonLabel = '';

  @Output()
  tasksToUp: EventEmitter<Task[]> = new EventEmitter();

  priceMin: number;
  priceMax: number;


  regions: Region[];
  region: Region;

  cities: City[];
  city: City;

  categories: Category[];
  category: Category;

  subcategories: Subcategory[];
  subcategory: Subcategory;

  tasks: Task[];

  constructor(private categoriesService: CategoriesService,
    private regionService: RegionsService,
    private taskService: TaskService) {}

  ngOnInit(): void {
    this.regionService.findAll().subscribe(data => {
      this.regions = data;
    });

    this.categoriesService.findAll().subscribe(data => {
      this.categories = data;
    });

    this.taskService.findAll().subscribe(data => {
      this.tasks = data;
    });
  }

  regionChange(region: Region){
    this.region = region;
    if(this.region.name === 'г. Минск'){
      this.cityLabel = 'Район';
    } else {
      this.cityLabel = 'Город';
    }
    this.cities = this.region.cities;
    this.findTask();
  }

  cityChange(city: City){
    this.city = city;
    this.findTask();
  }

  categoryChange(cat: Category){
    this.category = cat;
    this.subcategories = this.category.subcategories;
    this.findTask();
  }

  subcategoryChange(subcategory: Subcategory){
    this.subcategory = subcategory;
    this.findTask();
  }

  changeMinPrice(min: number){
    this.priceMin = min;
    this.findTask();
  }

  changeMaxPrice(max: number){
    this.priceMax = max;
    this.findTask();
  }

  findTask(){
    let region = this.region ? this.region.name : null;
    let city = this.city ? this.city.name : null;
    let category = this.category ? this.category.name : null;
    let subcategory = this.subcategory ? this.subcategory.name : null;
    let min = this.priceMin ? this.priceMin : "null";
    let max = this.priceMax ? this.priceMax : "null";

    this.taskService.getCountOfTaskByFilter(region, city, category, subcategory, min.toString(), max.toString()).subscribe(data => {
      this.buttonLabel = ': ' + data;
    });
  }


  sortedTasks(){
    let region = this.region ? this.region.name : null;
    let city = this.city ? this.city.name : null;
    let category = this.category ? this.category.name : null;
    let subcategory = this.subcategory ? this.subcategory.name : null;
    let min = this.priceMin ? this.priceMin : "null";
    let max = this.priceMax ? this.priceMax : "null";

    this.taskService.findAllByFilter(region, city, category, subcategory, min.toString(), max.toString()).subscribe(data => {
      this.tasks = data;
      this.tasksToUp.emit(this.tasks);
    });
  }

}
