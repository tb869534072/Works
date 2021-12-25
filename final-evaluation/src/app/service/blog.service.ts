import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private addBlogUrl = 'http://localhost:5000/addBlog';
  private getAllBlogsUrl: string = 'http://localhost:5000/blogs';
  private getSingleBlogUrl: string = 'http://localhost:5000/blog/';
  private updateBlogUrl: string = 'http://localhost:5000/updateBlog/';
  private deleteBlogUrl: string = 'http://localhost:5000/deleteBlog/';

  constructor(private http: HttpClient) { }

  addBlog(blog: any) {
    return this.http.post(this.addBlogUrl, blog);
  }

  getAllBlogs() {
    return this.http.get(this.getAllBlogsUrl);
  }

  getSingleBlog(id: string) {
    return this.http.get(this.getSingleBlogUrl + id);
  }

  updateBlog(blog: any, id: string) {
    return this.http.put(this.updateBlogUrl + id, blog);
  }

  deleteBlog(id: string) {
    return this.http.delete(this.deleteBlogUrl + id);
  }
}
