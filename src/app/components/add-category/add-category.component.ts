import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product_service/product.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),


  });
  constructor(private UtilityService: UtilityService, private productService: ProductService
    , public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }
  save() {
    if (this.categoryForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.categoryForm)
    } else {
      this.productService.saveCategory(this.categoryForm.value).subscribe(data => {
        this.UtilityService.openSnackBar(data['message'], 'close')
        this.dialogRef.close(true);
      }, err => {
        this.UtilityService.openSnackBar(err.error.message, 'close')

      })
    }

  }
}
