import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });
    dialogRef.afterClosed().subscribe((confirm:boolean) => {
      if (confirm) {
        this.signOut();
      }
    });
  }

  signOut() {
    this.authService.logout();
  }

}
