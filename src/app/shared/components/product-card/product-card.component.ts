import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { ProductWithKey } from '../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('productWithKey') productWithKey: ProductWithKey = {};
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;


  cartItem: ShoppingCartItem;

  constructor(public cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.productWithKey);
  }

}