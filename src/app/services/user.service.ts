import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import User from 'src/models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public http: HttpClient) { }
  routeUrl = `${environment.baseUrl}/User`;
  getAllUsers() {
    return this.http.get<User[]>(this.routeUrl);
  }
  getUserById(id: string) {
    return this.http.get<User>(`${this.routeUrl}/${id}`);
  }
  addUser(user: User) {
    return this.http.post<User>(this.routeUrl, user);
  }
  deleteUser(id: string) {
    return this.http.delete<User>(`${this.routeUrl}/${id}`)
  }
  updateUser(user: User) {
    return this.http.put<User>(`${this.routeUrl}/${user.Id}`, user);
  }
}
