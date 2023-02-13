import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Child from 'src/models/Child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(public http: HttpClient) { }
  routeUrl = `${environment.baseUrl}/Child`;
  getAllChildren() {
    return this.http.get<Child[]>(this.routeUrl);
  }
  getChildById(id: string) {
    return this.http.get<Child>(`${this.routeUrl}/${id}`);
  }
  addChild(child: Child) {
    return this.http.post<Child>(this.routeUrl, child);
  }
  deleteChild(id: string) {
    return this.http.delete<Child>(`${this.routeUrl}/${id}`)
  }
  updateChild(child:Child){
    return this.http.put<Child>(`${this.routeUrl}/${child.Id}`,child);
  }
  //TODO
  //function get all child for father also at the server
  
}
