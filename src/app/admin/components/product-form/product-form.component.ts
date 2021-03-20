import { CategoryWithKey } from 'shared/models/product-category';
import { Product, ProductWithKey } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id: string;
  productWithKey: ProductWithKey = {};
  categoriesWithKey$: Observable<CategoryWithKey[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private categoryService: CategoryService, 
    private productService: ProductService) {
    
    this.categoriesWithKey$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => {
        Object.assign(this.productWithKey, p);
        this.productWithKey.$key = this.id;
      })
    }
  }

  ngOnInit(): void {
  }

  save(product: Product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(!confirm('Are you sure, you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}