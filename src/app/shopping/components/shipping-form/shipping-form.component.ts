import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { Shipping } from 'shared/models/shipping';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  userID: string;
  userSubscription: Subscription;

  shipping: Shipping = {} as Shipping;
  @Input('cart') cart: ShoppingCart;

  constructor(
    private router: Router,
    private orderService: OrderService, 
    private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userID = user.uid);
  }

  async placeOrder(){
    let order = new Order(this.userID, this.shipping, this.cart);
    let reuslt = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', reuslt.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
