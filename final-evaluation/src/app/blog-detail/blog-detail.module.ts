import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [BlogDetailComponent],
  imports: [
    CommonModule,
    BlogDetailRoutingModule,
    MaterialModule
  ]
})
export class BlogDetailModule { }
