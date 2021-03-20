import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/models/order';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  getOrders() {
    return this.db.list<Order>('/orders');
  }

  getOrderByUser(userId: string) {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('userID').equalTo(userId));
  }
  
  async placeOrder(order: Order) {
    console.log(order); //test code
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

}
