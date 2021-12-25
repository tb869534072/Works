import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // email!: string ;
  // password!: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  password =  new FormControl('', [Validators.required]);
  registerForm = new FormGroup({
    email: this.email,
    password: this.password,
  })
  hide: boolean = true;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAlertDialog(msg: string) {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '550px',
      height: '200px',
      data: {
        msg
      }
    });
  }

  submitForm() {
    let credentials = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: 'user'
    }
    console.log(credentials);

    this.userService.addUser(credentials).subscribe((response: any) => {

        this.openAlertDialog(response.message);
    })
  }

}