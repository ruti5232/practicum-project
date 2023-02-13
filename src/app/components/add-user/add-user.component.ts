import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildService } from 'src/app/services/child.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import Child from 'src/models/Child';
import User from 'src/models/User';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
interface Gender {
  value: number;
  viewValue: string;
}
interface HMO {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  selectedValue: string;
  selectedCar: string;
  gender: Gender[] = [
    { value: 1, viewValue: 'זכר' },
    { value: 2, viewValue: 'נקבה' },
  ];
  hmo: HMO[] = [
    { value: 1, viewValue: 'כללית' },
    { value: 2, viewValue: 'מכבי' },
    { value: 3, viewValue: 'מאוחדת' },
    { value: 4, viewValue: 'לאומית' },
  ];
  user: User = new User(0, "", "",null, "", 0, 0, []);
  child: Child = new Child(0, "", "", null)
  isOpenChild: boolean = false;
  constructor(public userService: UserService, public childService: ChildService, public localStorageService: LocalStorageService) {  }
  data: any[] = [];
  ngOnInit(): void {
    if (localStorage.getItem("isAddChild")) {
      if (JSON.parse(localStorage.getItem("isAddChild")) == true)
        this.isOpenChild = true;
      else
        this.isOpenChild = false;
    }
    else
      this.isOpenChild = false;
    let localUser = localStorage.getItem("outUser");
    let localChild = localStorage.getItem("outChild");
    let myUser, myChild;
    if (localUser) {
      myUser = JSON.parse(localUser);
      this.user = new User(0, myUser.IdentityNumber, myUser.FirstName, myUser.DateOfBirth, myUser.LastName, myUser.GenderId, myUser.HMOId, myUser.Children);
    }
    else
      this.user = new User(0, "", "", new Date(), "", 0, 0, []);
    if (localChild) {
      myChild = JSON.parse(localChild);
      this.child = new Child(0, myChild.IdentityNumber, myChild.FirstName, myChild.DateOfBirth);
      this.isOpenChild = true;
    }
    else {
      this.child = new Child(0, "", "", new Date());
      this.isOpenChild = false;
    }
  }
  generateExcelFile() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("User Data");
    let header = ["Identity Number", "Date Of Birth", "First Name", "Last Name", "Gender", "HMO"]
    let headerRow = worksheet.addRow(header);
    let currentUser = this.localStorageService.getFromStorage("currentUser");
    let hmoStr = this.hmo[currentUser.HMOId - 1].viewValue;
    let dataUser = { IdentityNumber: currentUser.IdentityNumber, DateOfBirth: currentUser.DateOfBirth, FirstName: currentUser.FirstName, LastName: currentUser.LastName, Gender: currentUser.GenderId == 1 ? 'זכר' : 'נקבה', HMO: hmoStr };
    this.data.push(dataUser)
    let dataChild;
    for (var i = 0; i < currentUser.Children.length; i++) {
      dataChild = { IdentityNumber: currentUser.Children[i].IdentityNumber, DateOfBirth: currentUser.Children[i].DateOfBirth, FirstName: currentUser.Children[i].FirstName, }
      this.data.push(dataChild)
    }
    for (let x1 of this.data) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    let fname = "User Data";
    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
  ngOnDestroy(): void {
    localStorage.setItem("outUser", JSON.stringify(this.user));
    localStorage.setItem("outChild", JSON.stringify(this.child));
    localStorage.setItem("isAddChild", JSON.stringify(this.isOpenChild));
  }
  validDate() {
    if (this.user.DateOfBirth > new Date())
      return false;
    return true;
  }
  resetChild() {
    this.child.IdentityNumber = this.child.FirstName = "";
    this.child.DateOfBirth = null;
  }
  addChild() {
    if (this.isOpenChild == false) {
      this.isOpenChild = true;
    }
    else {
      this.isOpenChild = false;
    }
    console.log("isOpenaddchild", this.isOpenChild);
  }
  flag: boolean = false;
  save(form) {
    this.flag = false;
    this.addChildToParent();
      this.userService.addUser(this.user).subscribe(succ => {
        alert("משתמש נוסף בהצלחה")
        console.log("succ", succ);
        this.isOpenChild = false;
      }, (err) => {
        alert("התרחשה שגיאה בהוספת אבא!!")
      })
  }
  resetForm() {
    this.user.Children = [];
    this.user.GenderId = this.user.HMOId = this.user.DateOfBirth = null;
    this.user.FirstName = this.user.IdentityNumber = this.user.LastName = "";
  }
  addChildToParent() {
    let currentChild = new Child(0, this.child.IdentityNumber, this.child.FirstName, this.child.DateOfBirth)
    this.user.Children.push(currentChild)
    console.log("arrChildren", this.user.Children)
    console.log("child", this.child)
    this.resetChild();
  }
  login() {
    let currentUser = new User(0, this.user.IdentityNumber, this.user.FirstName, this.user.DateOfBirth, this.user.LastName, this.user.GenderId, this.user.HMOId, this.user.Children)
    this.localStorageService.currentUser.next(currentUser);
    this.localStorageService.setInStorage(currentUser, "currentUser");
    this.resetForm();
  }

}
