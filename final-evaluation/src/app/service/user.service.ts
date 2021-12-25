import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addUserUrl: string = 'http://localhost:5800/addUser';
  private updateUserUrl: string = 'http://localhost:5800/updateUser/';
  private deleteUserUrl: string = 'http://localhost:5800/deleteUser/';
  private allUsersUrl: string = 'http://localhost:5800/allUsers/';

  constructor(private http: HttpClient) { }

  addUser(user: any) {
    return this.http.post(this.addUserUrl, user);
  }

  updateUser(user: any, email: string) {
    return this.http.put(this.updateUserUrl + email, user);
  }

  deleteUser(email: string) {
    return this.http.delete(this.deleteUserUrl + email);
  }

  getAllUsers() {
    return this.http.get(this.allUsersUrl);
  }
}
