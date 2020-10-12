import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public UtilityService: UtilityService, private userService: UserService
    , private route: Router) {

  }

  ngOnInit() {
  }
  login() {
    if (this.loginForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.loginForm)
    } else {
      this.userService.login(this.loginForm.value).subscribe(data => {
        console.log('data after login', data);
        this.UtilityService.openSnackBar(data['message'], 'close')
        const obj = data['data'];
        localStorage.setItem('name', `${obj.firstName} ${obj.lastName}`)
        localStorage.setItem('token', obj.token)
        this.route.navigateByUrl('home')
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
