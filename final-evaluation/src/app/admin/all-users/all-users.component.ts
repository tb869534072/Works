import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface User {
  email: string,
  password: string
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];
  deletedUserID: string = '';
  showSpinner: boolean = false;
  displayedColumns: string[] = ['email', 'password', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoaded: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    this.loadAllUsers();

  }

  ngOnInit(): void {

  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(msg: string, email: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.deleteSingleUser(email);
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

  deleteSingleUser(email: string) {
    this.showSpinner = true;
    this.userService.deleteUser(email).subscribe((response) => {
      console.log(response);
      if (response) {
        this.showSpinner = false;
        this.openAlertDialog("The user was successfully deleted!");
      }
    })
  }

}
