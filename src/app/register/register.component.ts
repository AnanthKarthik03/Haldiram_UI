import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  mobile = '';
  name = '';
  email = '';
  spinner = false;
  regestrationForm = true;
  otpForm = false;
  passwordForm = false;
  password = '';
  otpp = '';
  constructor(
    public router: Router,
    public authService: LoginserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  regestration() {
    const body = {
      mobile: this.mobile,
      name: this.name,
      email: this.email,
    };

    console.log(body);

    this.authService
      .regestration({
        mobile: this.mobile.toString(),
        name: this.name,
        email: this.email,
      })
      .subscribe((data) => {
        if (data.success) {
          this.toastr.success('Please enter OTP');
          this.regestrationForm = false;
          this.otpForm = true;
          this.passwordForm = false;
        } else{
          this.toastr.error(data.message)
        }
      });
  }
  otp() {
    const body = {
      mobile: this.mobile,
      otp: this.otpp,
    };

    console.log(body);
    this.authService
      .otp({ mobile: this.mobile, otp: this.otpp })
      .subscribe((data) => {
        if (data.success) {
          this.toastr.success('OTP Validated!!');
          this.regestrationForm = false;
          this.otpForm = false;
          this.passwordForm = true;
        }else{
          this.toastr.error(data.message)
        }
      });
  }
  passwordSubmit() {
    const body = {
      mobile: this.mobile,
      password: this.password,
    };

    console.log(body);
    this.authService
      .password({ mobile: this.mobile, password: this.password })
      .subscribe((data) => {
        if (data.success) {
          this.toastr.success('Registered Successfully!!');
          this.login();
        }else{
          this.toastr.error(data.message)
        }
      });
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}
