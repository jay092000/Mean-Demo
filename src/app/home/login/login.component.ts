import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VanillaService } from 'src/app/services/vanilla.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupFlag = false;
  passwordShow = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordChecker]),
  });
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private vanillaSerivce: VanillaService
  ) {
    activeRoute.queryParams.subscribe((a) => {
      if (typeof a.type !== 'undefined' && Object.keys(a).length !== 0) {
        this.signupFlag = true;
      } else {
        this.signupFlag = false;
      }
    });
  }

  ngOnInit(): void {}
  passwordChecker(control: FormControl) {
    let pwd: string = control.value;
    let isUpper = 0,
      isDigit = 0,
      isLower = 0;
    for (let i = 0; i < pwd.length; i++) {
      if (pwd.charAt(i) >= '0' && pwd.charAt(i) <= '9') {
        isDigit = 1;
      } else if (pwd.charAt(i) >= 'a' && pwd.charAt(i) <= 'z') {
        isLower = 1;
      } else if (pwd.charAt(i) >= 'A' && pwd.charAt(i) <= 'Z') {
        isUpper = 1;
      }
    }
    if (isDigit + isLower + isUpper != 3) {
      return {
        strengthError: {
          strengthError: true,
        },
      };
    }
    return null;
  }
  singupClicked() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        type: 'signup',
      },
    });
  }
  loginClicked() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {},
    });
  }
  loginSubmit() {
    this.userService
      .userLogin(this.loginForm.value)
      .then((a: any) => {
        if (a.success && a.data) {
          debugger;
          if (a.data[0].roleId === 2) {
            this.router.navigate(['user']);
          } else if (a.data[0].roleId === 1) {
            this.router.navigate(['admin']);
          }
          this.vanillaSerivce.swal.fire({
            icon: 'success',
            text: 'welcome back!',
          });
        }
      })
      .catch((e) => {
        this.vanillaSerivce.swal.fire({
          icon: 'error',
          text: e.error.data,
        });
      });
  }
  signUpSubmit() {
    this.userService
      .userSignUp(this.signUpForm.value)
      .then((a: any) => {
        if (a.success && a.data) {
          this.vanillaSerivce.swal.fire({
            icon: 'success',
            text: 'Singup completed successfully!',
          });
        }
      })
      .catch((e) => {
        this.vanillaSerivce.swal.fire({
          icon: 'error',
          text: e.error.data,
        });
      });
  }
}
