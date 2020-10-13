import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product_service/product.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  categoryId: string
  price: any
  productName: string
  quantity: any,
  productId: string,
  type: ''
}
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass']
})
export class ProductAddComponent implements OnInit {
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    productId: new FormControl(''),

  });
  selectedType = 'add';
  categoryArray = [];
  constructor(public UtilityService: UtilityService, private productService: ProductService
    , public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('data is ', data);
    this.selectedType = data.type
    this.productForm.setValue({
      productName: data.productName,
      price: data.price,
      quantity: data.quantity,
      categoryId: data.categoryId,
      productId: data.productId ? data.productId : ''
    })

  }
  ngOnInit() {
    this.getAllCategory();
  }
  getErrorMessage(control: FormControl, alias: string) {
    return this.UtilityService.getErrorMessage(control, alias)
  }
  getAllCategory() {
    this.productService.getAllCategory().subscribe(data => {
      this.categoryArray = data['data']
      if (this.categoryArray.length == 0) {
        this.UtilityService.openSnackBar('please first Add Category', 'close', 10000)

      }
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }

  save() {
    if (this.productForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.productForm)
    } else {
      if (this.selectedType == 'add') {
        this.productService.saveProduct(this.productForm.value).subscribe(data => {
          this.UtilityService.openSnackBar(data['message'], 'close')
          this.dialogRef.close(true);
        }, err => {
          this.UtilityService.openSnackBar(err.error.message, 'close')

        })
      } else {
        this.productService.updateProduct(this.productForm.value).subscribe(data => {
          this.UtilityService.openSnackBar(data['message'], 'close')
          this.dialogRef.close(true);

        }, err => {
          this.UtilityService.openSnackBar(err.error.message, 'close')

        })
      }

    }
  }
}
