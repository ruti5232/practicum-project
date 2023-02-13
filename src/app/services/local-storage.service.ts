import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  currentUser = new BehaviorSubject<User>(null);

  constructor() { }

  setInStorage(user:User,str:string) {
    
    localStorage.setItem(str, JSON.stringify(user))
  }
  getFromStorage(str:string) {
    let user = localStorage.getItem(str);
    if (!user)
      return null;
    return JSON.parse(user);
  }
  removeFromStorage(str:string){
    localStorage.removeItem(str);
  }
}
