import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { UserComponent } from './user/user.component';
import { DialogComponent } from './dialog/dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { TagComponent } from './tag/tag.component';
import { AddBlogComponent } from './user/add-blog/add-blog.component';
import { AllBlogsComponent } from './user/all-blogs/all-blogs.component';
import { UpdateBlogComponent } from './user/update-blog/update-blog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    AlertDialogComponent,
    TagComponent,
    AddBlogComponent,
    AllBlogsComponent,
    UpdateBlogComponent,
    AdminLoginComponent,
    // AdminComponent,
    AddUserComponent,
    AllUsersComponent,
    // UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    HttpClientModule,
    RichTextEditorAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // MatTableModule,
    // MatPaginatorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        },
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:5800/login']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
