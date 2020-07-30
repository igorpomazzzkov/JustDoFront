import { Component, OnInit } from '@angular/core';
import { Region } from '../../../entity/region';
import { City } from '../../../entity/city';
import { Category } from '../../../entity/category';
import { Subcategory } from '../../../entity/subcategory';
import { Task } from '../../../entity/task';
import { CategoriesService } from '../../../services/categories.service';
import { RegionsService } from '../../../services/regions.service';
import { TaskService } from '../../../services/tasks.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


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

  constructor(private categoriesService: CategoriesService,
    private regionService: RegionsService,
    private formBuilder: FormBuilder,
    private taskService: TaskService) {
      this.taskForm = this.formBuilder.group({
        name: '',
        description: '',
        category: this.category,
        subcategory: this.subcategory,
        region: this.region,
        city: this.city,
        price: 0,
        date: ''
      });
    }

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe(data => {
      this.categories = data;
    });

    this.regionService.findAll().subscribe(data =>{
      this.regions = data;
    });
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

  cityChange(city: City){
    this.city = city;
  }

  onSubmit(customerData){
    console.log(customerData);
  }
}
