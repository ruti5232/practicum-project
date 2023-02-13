import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

const routes: Routes = [
  {path:"",  redirectTo: "add-user", pathMatch: "full" },
  {path:"add-user",component:AddUserComponent},
  {path:"instructions",component:InstructionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
