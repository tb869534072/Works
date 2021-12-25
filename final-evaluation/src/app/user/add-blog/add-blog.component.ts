import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { TagComponent } from '../../tag/tag.component';
import { FeatureImageService } from '../../service/feature-image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  selectedFile!: File;
  id!: string;
  title!: string;
  content!: string;
  tags!: [];
  createdAt: Date = new Date();
  previewImage: any;
  showSpinner: boolean = false;
  @ViewChild(TagComponent, { static: false }) childRef: any;
  blogListLen: number = 0;

  constructor(private imageService: FeatureImageService,
    private blogService: BlogService,
    private dialog: MatDialog,) {
    this.blogService.getAllBlogs().subscribe((response: any) => {
      console.log(response)
      this.blogListLen = response.length;
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tags = this.childRef.tags;
  }

  processFile(file: any) {
    this.selectedFile = file.files[0];
    this.previewImageLoad();
  }

  previewImageLoad() {
    let reader = new FileReader();
    reader.onloadend = e => {
      this.previewImage = reader.result;
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
    })
  }

  async submitBlog() {
    this.showSpinner = true;
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe(res => {
        console.log(res);
      });
    }

    let blog = {
      id: this.blogListLen + 1,
      title: this.title,
      content: this.content.substring(3, this.content.length - 4),
      image: '',
      createdAt: this.createdAt,
      tags: []
    }

    this.tags.map((tag) => {
      blog.tags.push(tag['name'])
    });

    this.blogService.addBlog(blog).subscribe((response: any) => {
      this.id = response.id;
      this.showSpinner = false;
      this.openAlertDialog(`Blog has been created!`);
      this.title = "";
      this.content = "";
      this.previewImage = "";
      this.createdAt = new Date();
      this.tags = [];
      this.blogListLen++;
    })
  }

}
