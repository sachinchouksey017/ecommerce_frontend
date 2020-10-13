import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product_service/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList;
  product = [];
  categoryArray = [];
  productData = {
    productName: '',
    price: '',
    quantity: '',
    categoryId: '',
    type: 'add'
  }
  noProductCheck = false;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private productService: ProductService, public dialog: MatDialog, private UtilityService: UtilityService,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.getProducts()
    this.getAllCategory()
  }
  getAllCategory() {
    this.productService.getAllCategory().subscribe(data => {
      this.categoryArray = data['data']
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
  getProducts() {
    this.noProductCheck = false;
    this.productService.getAllProduct().subscribe(data => {
      console.log('all product', data);
      this.product = data['data']
      this.noProductCheck = true;
    }, err => {
      console.log('err product', err);

    })
  }
  addUpdateProduct(data = this.productData): void {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getProducts();
      }
      // this.animal = result;
    });
  }
  update(data) {
    if (data.type == 'delete') {
      this.getProducts();
    } else if (data.type == 'update') {
      this.addUpdateProduct(data.data)
    }
  }
  filter(categoryName) {
    console.log('filter ', categoryName);
    this.noProductCheck = false;
    this.productService.getProductByCategory(categoryName).subscribe(data => {
      console.log('all product', data);
      this.product = data['data']
      this.noProductCheck = true;

    }, err => {
      console.log('err product', err);

    })
  }
  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getAllCategory()
      }
      // this.animal = result;
    });
  }
  sortByDate() {
    this.noProductCheck = false;
    this.productService.shortByDate().subscribe(data => {
      this.product = data['data']
      this.noProductCheck = true;

    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }
}
