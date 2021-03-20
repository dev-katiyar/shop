import { switchMap } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) { 
    this.orders$ = authService.user$.pipe(
      switchMap(u => this.orderService.getOrderByUser(u.uid).valueChanges())
    );
  }

}
