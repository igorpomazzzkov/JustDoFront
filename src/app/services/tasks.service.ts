import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../entity/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[];

  private taskURL: string;
  constructor(private http: HttpClient) {
    this.taskURL = "http://localhost:8080/tasks";
   }

   public findAll(): Observable<Task[]>{
     return this.http.get<Task[]>(this.taskURL);
   }

   public addTask(task: Task){
     return this.http.post<Task>(this.taskURL, task, {responseType: 'json'})
   }

   public editTask(task: Task){
     return this.http.put<Task>(this.taskURL, task, {responseType: 'json'});
   }

   public deleteTask(id: number){
     let idToDB = id.toString();
     let info: boolean;
     return this.http.delete<Task[]>(this.taskURL + "/deleteTask", {
       params: {
       'id': idToDB
      },
      responseType: 'json'
    });
   }

   public findAllByFilter(
     region: string,
     city: string,
     category: string,
     subcategory: string,
     min: string,
     max: string): Observable<Task[]>{
      return this.http.get<Task[]>(this.taskURL + "/filterTask", {
        params: {
          'region': region,
          'city': city,
          'category': category,
          'subcategory': subcategory,
          'min': min,
          'max': max
        }
      });
   }

   public getCountOfTaskByFilter(
     region: string,
    city: string,
    category: string,
    subcategory: string,
    min: string,
    max: string): Observable<number>{
      return this.http.get<number>(this.taskURL + "/countByFilter", {
        params: {
          'region': region,
          'city': city,
          'category': category,
          'subcategory': subcategory,
          'min': min,
          'max': max
        }
      });
    }
}
