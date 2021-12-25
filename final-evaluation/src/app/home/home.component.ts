import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Blog {
  id: string,
  title: string,
  content: string,
  featureImage: string,
  createdAt: string,
  tags: []
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allBlogs: Blog[] = [];
  config: any;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) {
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
      response.forEach((element: any) => {
        this.allBlogs.push(element);
      });
      // this.config.totalItems = response.length();
    });
    
    this.route.queryParams.subscribe(
      (params: any) => {
        this.config.currentPage = params['page'] ? params['page'] : 1
      });
  }

  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
}
