import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class Comment {
  [x: string]: any;
  commentText: number;
  rate: string;

}
