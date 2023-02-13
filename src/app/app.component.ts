import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit {
  constructor(public localStorageService: LocalStorageService) { }
  ngOnInit(): void {
    this.localStorageService.currentUser.next(this.localStorageService.getFromStorage("currentUser"))
  }

  
       
  title = 'practicumProject';
}


  

