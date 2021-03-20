import { ProductWithKey } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    dateCreated: string;
    itemsArr: ShoppingCartItem[] = [];
    items: {[productID: string]: ShoppingCartItem} = {};
    
    constructor(private dbDict: {[productID: string]: ShoppingCartItem}){
      for(let productID in this.dbDict){
        let item = this.dbDict[productID];
        let scItem = new ShoppingCartItem({...item, $key: productID});
        
        this.items[productID] = scItem; 
        this.itemsArr.push(scItem);
      }
      //console.log(this.itemsArr); // test code line item. 
    }

    getQuantity(productWithKey: ProductWithKey){
      let item = (this.items)[productWithKey.$key];
      return item ? item.quantity : 0;
    }

    get totalPrice(){
      let sum=0
      for(let item of this.itemsArr){
        sum += item.totalPrice;
      }
      return sum;
    }

    get totalItemCount() {
        let count = 0;
        for(let productID in this.items)
          count += this.items[productID].quantity;
        
        return count;
    }
}