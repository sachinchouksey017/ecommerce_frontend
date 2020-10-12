import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product_service/product.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';

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
    categoryId: new FormControl('', [Validators.required])
  });
  selected = 'option2';
  categoryArray = [];
  constructor(public UtilityService: UtilityService, private productService: ProductService) {

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
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
}
