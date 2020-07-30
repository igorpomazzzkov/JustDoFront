import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private taskURL: string;
  constructor(private http: HttpClient) {
    this.taskURL = "http://localhost:8080/users";
   }

   public findAll(): Observable<User[]>{
     return this.http.get<User[]>(this.taskURL);
   }

   public findUserById(id: number): Observable<User>{
     return this.http.get<User>(this.taskURL + '/' + id);
   }
}
