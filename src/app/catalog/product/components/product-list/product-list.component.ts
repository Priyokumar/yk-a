import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/common/module/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { IProduct } from '../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickDelete(id: string) {

    this.dialog.open(ConfirmationDialogComponent,{data:{title:'Delete Category', message:'Are you sure to delte?'},width:'30%'}).afterClosed().subscribe(data => {
      if (data) {
        this.productService.deleteProduct(id).subscribe(data => {
          this.snackbar.open('A category has been deleted', 'ok', { duration: 3000 });
          this.getProducts();
        })
      }
    }, error => {
      this.snackbar.open('Failed to delete!', 'ok', { duration: 3000 });
    })

  }

  onClickEdit(product: IProduct) {

    this.dialog.open(CreateProductComponent, { data: product, width: '500px', autoFocus: false, disableClose: true }).afterClosed().subscribe(data => {
      if(data){
        this.getProducts();
      }
    })

  }

  openCreateProductDialog(){
    this.dialog.open(CreateProductComponent, { disableClose: true, width: '500px', autoFocus: false, data: null }).afterClosed().subscribe(data => {
      if (data) {
        this.getProducts();
      }
    })
  }

}
