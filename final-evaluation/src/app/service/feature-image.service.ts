import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeatureImageService {

  constructor(private http: HttpClient) { }

  // uploadImage(image: File) {
  //   return this.http.post('http://localhost:5000/upload', image);
  // }

  uploadImage(fileToUpload: any) {
    const endpoint = 'http://localhost:5000/upload';
    const formData: FormData = new FormData();
    // console.log(fileToUpload.name);
    formData.append('photo', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}
