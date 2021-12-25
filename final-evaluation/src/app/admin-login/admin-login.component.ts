import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  // email!: string ;
  // password!: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  password =  new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  })
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

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
    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    this.authService.login(credentials).subscribe((response: any) => {
      console.log(response);
      if (response) {
        localStorage.setItem('authToken', response);
        this.router.navigate(['/admin/all-users/']);
      }
    }, 
    (error) => {
      this.openAlertDialog("email or password is incorrect!");
    })

  }
}