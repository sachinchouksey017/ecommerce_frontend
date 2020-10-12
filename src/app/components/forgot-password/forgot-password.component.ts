import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  disabled = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    url: new FormControl('http://localhost:4200')
  });
  constructor(public UtilityService: UtilityService, private userService: UserService
    , private route: Router) {

  }

  ngOnInit() {
  }
  forgot() {
    if (this.loginForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.loginForm)
    } else {
      this.userService.forgot(this.loginForm.value).subscribe(data => {
        console.log('data after login', data);
        this.UtilityService.openSnackBar(data['message'], 'close')
        this.disabled = true;
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

