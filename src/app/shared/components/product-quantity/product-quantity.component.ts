import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { ProductWithKey } from '../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('productWithKey') productWithKey: ProductWithKey = {};
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { 
  }

  addToCart(){
    this.cartService.addToCart(this.productWithKey);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.productWithKey);
  }

}
