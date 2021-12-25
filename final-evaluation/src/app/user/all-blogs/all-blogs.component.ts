import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { BlogService } from 'src/app/service/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

interface Blog{
  id: string,
  title: string,
  content:string,
  featureImage: string,
  tags: []
}

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  blogs: Array<Blog> = [];
  deletedBlogID: string = '';
  showSpinner: boolean = false;
  config: any;

  constructor(private blogService: BlogService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 4,
      totalItems: 0
    }
  }

  ngOnInit(): void {
    this.loadAllBlogs();
  }

  loadAllBlogs() {
    this.blogService.getAllBlogs().subscribe((response: any) => {
      response.forEach((e: any) => {
        this.blogs.push(e);
      })
    });

    this.route.queryParams.subscribe(
      (params: any) => {
        this.config.currentPage = params['page'] ? params['page'] : 1
      });
  }

  pageChange(newPage: number) {
    this.router.navigate(['/user/all-blogs'], { queryParams: { page: newPage } });
  }

  openDialog(msg: string, blogID: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.deleteSingleBlog(blogID);
      }
    });
  }

  openAlertDialog(msg: string) {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    })
  }

  deleteSingleBlog(blogID: string) {
    this.showSpinner = true;
    this.blogService.deleteBlog(blogID).subscribe((response) => {
      if (response) {
        this.showSpinner = false;
        this.openAlertDialog("The blog was successfully deleted!");
      }
    })
  }

  
}
