import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  private subscripton: Subscription;

  constructor(private shoppingCartService: ShoppingCartService){}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
