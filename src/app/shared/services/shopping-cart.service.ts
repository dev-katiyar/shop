import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { take, map } from 'rxjs/operators';
import { ProductWithKey } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) {}

  async getCart(){
    let cartID = await this.getorCreateCartID();
    return this.db.object<ShoppingCart>('/shopping-carts/'+ cartID).valueChanges()
    .pipe(map(ct => new ShoppingCart(ct.items)));
  }
 
  async addToCart(productWithKey: ProductWithKey) {
    this.udpateItem(productWithKey, 1);
  }

  async removeFromCart(productWithKey: ProductWithKey) {
    this.udpateItem(productWithKey, -1);
  }

  async clearCart() {
    let cartID = await this.getorCreateCartID();
    this.db.object('/shopping-carts/' + cartID + '/items').remove();
  }
 
  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItemRef(cartID: string, productID: string){
    return this.db.object<ShoppingCartItem>('/shopping-carts/' + cartID + '/items/' + productID);
  }

  private async getorCreateCartID (){
    let cartID = localStorage.getItem('cartID');
    if(cartID) return cartID;
    
    let result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  private async udpateItem(productWithKey: ProductWithKey, change: number) {
    let cartID = await this.getorCreateCartID();
    let itemRef = this.getItemRef(cartID, productWithKey.$key);
    itemRef.valueChanges()
    .pipe(take(1)).subscribe(item => {
      let quantity = (item? item.quantity: 0) + change;
      if(quantity === 0) itemRef.remove();
      else itemRef.update({
          title: productWithKey.title,
          imageUrl: productWithKey.imageUrl,
          price: productWithKey.price,
          quantity: quantity
       })
    });
  }

}
