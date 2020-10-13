import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product_service/product.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private productService: ProductService, private UtilityService: UtilityService) { }
  @Input() product = [];
  @Input() noProductCheck = false;
  @Output() messageEvent = new EventEmitter<any>();
  ngOnInit() {
  }
  deleteCard(card) {
    this.productService.deleteProduct({ productId: card._id }).subscribe(data => {
      this.UtilityService.openSnackBar(data['message'], 'close')
      this.messageEvent.emit({ type: 'delete', data: '' })
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
  editCard(card) {
    let dumyProduct = {
      productName: card.productName,
      price: card.price,
      quantity: card.quantity,
      categoryId: card.category._id,
      type: 'update',
      productId: card._id
    }
    this.messageEvent.emit({ type: 'update', data: dumyProduct })
  }
}
