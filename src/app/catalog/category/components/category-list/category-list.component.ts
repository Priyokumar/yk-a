import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/catalog/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CategoryListComponent>,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories({ topCategory: false }).subscribe(data => {
      this.categories = data.data;
    }, error => {
      console.log(error);
    })
  }

  onClickCategory(category: any){
    this.dialogRef.close(category);
  }
 
  close(){
    this.dialogRef.close();
  }

}
