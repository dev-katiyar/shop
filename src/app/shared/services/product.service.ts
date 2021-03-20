import { Product, ProductWithKey } from 'shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list<Product>('/products').snapshotChanges()
    .pipe(
      map(actions => 
        actions.map(p => { 
            let pk = {} as ProductWithKey;
            Object.assign(pk, p.payload.val());
            pk.$key = p.key;
            return pk;
          }
        )
      )
    );
  }

  get(productID: string) {
    return this.db.object<Product>('/products/' + productID).valueChanges();
  }

  update(productID: string, product: Product) {
    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID: string) {
    this.db.object('/products/' + productID).remove();
  }
}
