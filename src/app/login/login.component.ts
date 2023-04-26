import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginserService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  spinner = false;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private loginService: LoginserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.valiDate();
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.myForm.controls;
  }
  // tslint:disable-next-line:typedef
  valiDate() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  dashboard() {
    this.spinner = true;
    const body = this.myForm.value;
    this.loginService.adminLogin(body).subscribe(
      (data) => {
        if (data.success) {
          console.log(data.data.role);

          this.spinner = false;
          this.toastr.success('Login Successfull');

          this.router.navigate(['/Dashboard']);
        } else {
          this.spinner = false;
          this.toastr.error(' Incorrect UserID or Password');
        }
      },
      (err) => {
        this.spinner = false;
        this.toastr.error('Network Error');
      }
    );
  }
  // tslint:disable-next-line:typedef
  register() {
    this.router.navigate(['/register']);
  }

}
