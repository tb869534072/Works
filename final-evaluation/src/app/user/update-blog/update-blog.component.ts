import { Component, OnInit, ViewChild } from '@angular/core';
import { FeatureImageService } from 'src/app/service/feature-image.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from 'src/app/service/blog.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TagComponent } from 'src/app/tag/tag.component';

interface Blog {
  id: string,
  title: string;
  content: string;
  featureImage: any;
  createdAt: any;
  tags: any[]
}

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  private id: string = '';
  private selectedFile!: File;
  showSpinner: boolean = false;
  createdAt: Date = new Date();
  blog: Blog = {
    id: '',
    title: "",
    content: "",
    featureImage: "",
    createdAt: '',
    tags: []
  }
  @ViewChild(TagComponent, { static: false }) childRef: any;

  constructor(private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private blogService: BlogService,
    private imageService: FeatureImageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((response) => {
      this.id = response['id'];
      this.getBlogInfo();
    })
  }

  ngAfterViewInit() {
    this.childRef.tags.forEach((tag: any) => {
        this.blog.tags.push(tag);
      });
  }

  processFile(imageInput: any) {
    this.selectedFile = imageInput.files[0];
    this.previewImageLoad();
  }

  previewImageLoad(){
    let reader = new FileReader();
    reader.onloadend  = e => {
      this.blog.featureImage = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.submitBlog();
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
      this.router.navigate(['/user/all-blogs']);
    });
  }

  getBlogInfo() {
    this.blogService.getSingleBlog(this.id).subscribe((response: any) => {
      this.blog.id = response.id;
      this.blog.title = response.title;
      this.blog.content = response.content;
      this.blog.featureImage = response.featureImage;
      this.blog.createdAt = response.createdAt;
      this.blog.tags = response.tags;
    })
  }

  remove(tag: any): void {
    const index = this.blog.tags.indexOf(tag);

    if (index >= 0) {
      this.blog.tags.splice(index, 1);
    }
  }

  async submitBlog() {
    this.showSpinner = true;
    let imageLink: any;
    if (this.selectedFile) {
      const imageData$ = this.imageService.uploadImage(this.selectedFile);
      const imageData: any = await lastValueFrom(imageData$);
      imageLink = imageData['data'].link;
    } else {
      imageLink = this.blog.featureImage;
    }

    this.childRef.tags.forEach((tag: any) => {
      this.blog.tags.push(tag.name);
    });

    let update = {
      id: this.blog.id,
      title: this.blog.title,
      content: this.blog.content.substring(3, this.blog.content.length - 4),
      featureImage: imageLink,
      createdAt: this.createdAt,
      tags: this.blog.tags
    }

    this.blogService.updateBlog(update, this.id).subscribe((response: any) => {
      this.id = response.id;
      this.showSpinner = false;
      this.openAlertDialog("Blog has been updated!");
    })
  }
}
