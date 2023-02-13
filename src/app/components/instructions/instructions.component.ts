import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  firstUserName = "";
  lastUserName = "";

  constructor(public localStorageService: LocalStorageService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.localStorageService.currentUser.next(null);
    this.localStorageService.removeFromStorage("currentUser");
  }

  ngOnInit(): void {
    this.subscription = this.localStorageService.currentUser.subscribe(data => { this.firstUserName = data ? data.FirstName : ""; this.lastUserName = data ? data.LastName : "" })
    console.log("user", this.firstUserName)

  }

}
