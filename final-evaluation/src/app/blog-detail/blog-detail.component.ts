import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { ActivatedRoute } from '@angular/router';

interface Blog {
  id: string,
  title: string,
  content: string,
  featureImage: string,
  createdAt: string,
  tags: string[]
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  private blogID: string = '';
  blog: Blog = {
    id: '',
    title: '',
    content: '',
    featureImage: '',
    createdAt: '',
    tags: []
  }

  constructor(private blogService: BlogService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((response) => {
      this.blogID = response['id'];
      this.getBlogDetails();
    });
  }

  getBlogDetails() {
    this.blogService.getSingleBlog(this.blogID).subscribe((response: any) => {
      this.blog.id = response.id;
      this.blog.title = response.title;
      this.blog.content = response.content;
      this.blog.featureImage = response.featureImage;
      this.blog.createdAt = response.createdAt;
      this.blog.tags = response.tags;
    })
  }

}
