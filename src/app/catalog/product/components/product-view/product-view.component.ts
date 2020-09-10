import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IProductRequest } from '../../model/product.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { Observable, empty } from 'rxjs';
import { CategoryService } from 'src/app/catalog/services/category.service';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/catalog/category/model/category.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product: IProductRequest;
  id: string;
  category$: Observable<any>;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {

    this.id = this.activatedRoute.snapshot.params.id;
    this.getProduct();
  }

  ngOnInit(): void {
  }

  getProduct() {
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data.data;
      if (this.product.categoryId) {
        this.category$ = this.categoryService.getCategoryById(this.product.categoryId).pipe(
          map(data => {
            return data.data;
          })
        );
      }
    }, error => {
      console.log(error);
    });
  }

  onClickEdit() {

    this.dialog.open(CreateProductComponent, { data: this.product, width: '500px', autoFocus: false, disableClose: true }).afterClosed().subscribe(data => {
      if (data) {
        this.getProduct();
      }
    })

  }

}
