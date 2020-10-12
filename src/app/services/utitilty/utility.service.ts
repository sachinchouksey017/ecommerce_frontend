import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  getErrorMessage(control: FormControl, alias: string) {
    if (control.errors) {
      if (control.errors.required) {
        return alias + ' is required';
      }

      if (control.errors.pattern) {
        return 'Invalid ' + alias.toLowerCase();
      }
      if (control.errors.minlength) {
        return alias + ' should have at least ' + control.errors.minlength.requiredLength + ' characters';
      }
      if (control.errors.maxlength) {
        return alias + ' should not have more than ' + control.errors.maxlength.requiredLength + ' characters';
      }
      if (control.errors.min) {
        return alias + ' should be greater than ' + control.errors.min.min;
      }
      if (control.errors.max) {
        return alias + ' can not be greater than ' + control.errors.max.max;
      }
      if (control.errors.email) {
        return alias + ' is not valid';
      }
    }
  }
  /**
* Marks all controls in a form group as touched
* @param formGroup - The form group to touch
*/
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
