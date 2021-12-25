import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';

const routes: Routes = [
  {path: '', component: BlogDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogDetailRoutingModule { }
