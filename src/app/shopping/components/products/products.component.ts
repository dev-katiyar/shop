import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { ProductWithKey } from 'shared/models/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  productsWithKey: ProductWithKey[] = [];
  filteredProductsWithKey: ProductWithKey[] = [];
  
  category: string;
  cart$: Observable<ShoppingCart>; // = new ShoppingCart({'': new ShoppingCartItem()});
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap( prods => {
          this.productsWithKey = prods;
          return this.route.queryParamMap;
      })
      ).subscribe(params => {
        this.category = params.get('category');
        this.applyFilters();
    });
  }

  private applyFilters() {
    this.filteredProductsWithKey = (this.category) ?
    this.productsWithKey.filter(pk => pk.category == this.category) :
    this.productsWithKey;
  }
}
