import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public UtilityService: UtilityService, private userService: UserService
    , private route: Router) {

  }

  ngOnInit() {
  }
  register() {
    if (this.registerForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.registerForm)
    } else {
      this.userService.register(this.registerForm.value).subscribe(data => {
        this.UtilityService.openSnackBar(data['message'], 'close')
        this.route.navigateByUrl('login')
      }, err => {
        this.UtilityService.openSnackBar(err.error.message, 'close')

      })
    }
  }
  getErrorMessage(control: FormControl, alias: string) {
    return this.UtilityService.getErrorMessage(control, alias)
  }

}
