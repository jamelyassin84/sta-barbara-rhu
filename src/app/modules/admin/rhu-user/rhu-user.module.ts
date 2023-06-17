import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RhuUserComponent } from './rhu-user.component';
import { RhuUserListComponent } from './rhu-user-list/rhu-user-list.component';



@NgModule({
  declarations: [
    RhuUserComponent,
    RhuUserListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RhuUserModule { }
