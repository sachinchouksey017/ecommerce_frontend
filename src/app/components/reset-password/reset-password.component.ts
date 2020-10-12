
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),

  });
  constructor(public UtilityService: UtilityService, private userService: UserService
    , private route: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {
      localStorage.setItem('token', param.token)
    });

  }

  ngOnInit() {
  }
  login() {
    if (this.loginForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.loginForm)
    } else {
      this.userService.resetPassword(this.loginForm.value).subscribe(data => {
        this.UtilityService.openSnackBar(data['message'], 'close')
        this.route.navigateByUrl('login')
      }, err => {
        console.log('err after login', err);
        this.UtilityService.openSnackBar(err.error.message, 'close')

      })
    }
  }
  getErrorMessage(control: FormControl, alias: string) {
    return this.UtilityService.getErrorMessage(control, alias)
  }

}

