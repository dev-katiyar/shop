import { Product, ProductWithKey } from 'shared/models/product';
import { map } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  products: ProductWithKey[] = [];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', '$key'];
  dataSource = new MatTableDataSource<ProductWithKey>();
  @ViewChild(MatPaginator, { static: true } ) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } ) sort: MatSort;
  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(prods => {
        this.products = prods;
        this.dataSource.data = this.products;
    })
  }

  filter(query: string) {
    let filteredProducts = (query)
    ? this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    : this.products;
    this.dataSource.data = filteredProducts;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (dataItem, sortHeaderID) => {
      switch(sortHeaderID) {
        case 'title': return dataItem.title;
        case 'price': return dataItem.price;
        default: return '';
      }
    };
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    //if(!this.dataSource) return;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

}
