import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/catalog/services/category.service';
import { ConfirmationDialogComponent } from 'src/app/common/module/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges {

  categories: any[] = [];
  @Input() refresh = false;
  snackbar: any;

  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.refresh){
      this.getCategories();
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories({ topCategory: false }).subscribe(data => {
      this.categories = data.data;

      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    }, error => {
      console.log(error);
    })
  }

  onClickDelete(categoryId: string) {

    this.dialog.open(ConfirmationDialogComponent,{data:{title:'Delete Category', message:'Are you sure to delte?'},width:'30%'}).afterClosed().subscribe(data => {
      if (data) {
        this.categoryService.deleteCategory(categoryId).subscribe(data => {
          this.snackbar.open('A category has been deleted', 'ok', { duration: 3000 });
        })
      }
    }, error => {
      this.snackbar.open('Failed to delete!', 'ok', { duration: 3000 });
    })

  }

  onClickCreate(category: any) {

    this.dialog.open(CreateCategoryComponent, { data: {category}, width: '50%', autoFocus: false, disableClose: true }).afterClosed().subscribe(data => {
      if(data){
        this.getCategories();
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
