import { CategoryWithKey } from 'shared/models/product-category';
import { CategoryService } from 'shared/services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categoriesWithKey$: Observable<CategoryWithKey[]>;

  @Input('category') category: string;

  constructor(private categoryService: CategoryService) { 
    this.categoriesWithKey$ = this.categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
