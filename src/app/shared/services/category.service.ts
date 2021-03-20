import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Category, CategoryWithKey } from 'shared/models/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list<Category>('/categories',  ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(
      map(actions => 
        actions.map( c => {
          return <CategoryWithKey>{$key: c.key, category: c.payload.val()}
      }))
    );
  }
}


    // ..................//
    // NOTE: After a lot of hit and trial, Following is the code to transform 
    // Lists from Firebase to Object Array that can be used in the project
    // ..................//

    // let categories$ = this.db.list<Category>('categories');
    
    // let snapshotActionArrayOfCat$ = categories$.snapshotChanges();
    // console.log(categories$);

    // let actoinsPipe = snapshotActionArrayOfCat$.pipe(
    //   map(actions => actions.map( a => {
    //     return {$key: a.key, name: a.payload.val().name}
    //   }))
    // );

    // actoinsPipe.subscribe(x => console.log(x))