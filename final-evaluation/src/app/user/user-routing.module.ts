import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';

const routes: Routes = [
  { path: 'all-blogs', component: AllBlogsComponent },
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'update-blog/:id', component: UpdateBlogComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
