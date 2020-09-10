import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from 'src/app/catalog/services/category.service';
import { element } from 'protractor';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  categoryId: string;
  topCategory = false;
  nameFormCtrl = new FormControl('', Validators.required);
  descriptionFormCtrl = new FormControl('', Validators.required);

  selectedCategoeries = [];
  errorMsg = '';

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {

    if (data.category) {
      this.updateFormData(data.category);
    }

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  openCategoriesDialog() {
    this.dialog.open(CategoryListComponent, { width: '40%', autoFocus: false }).afterClosed().subscribe(data => {
      if (data) {
        this.selectedCategoeries.push(data);
      }
    });
  }

  onClickSave() {

    let requestPayload: any = {
      name: this.nameFormCtrl.value,
      description: this.descriptionFormCtrl.value,
      topCategory: this.topCategory,
      subCategoryIds: this.selectedCategoeries.map(element => { return element.id })
    }

    let categoryObs$ = this.categoryService.saveCategory(requestPayload);

    if (this.categoryId) {
      requestPayload.id = this.categoryId;
      categoryObs$ = this.categoryService.updateCategory(this.categoryId, requestPayload);
    }

    categoryObs$.subscribe(data => {
      this.dialogRef.close(true);
    }, error => {
      this.errorMsg = 'Something went wrong while creating category';
    })

  }

  updateFormData(category: any) {

    this.categoryId = category.id;
    this.topCategory = category.topCategory
    this.nameFormCtrl.setValue(category.name);
    this.descriptionFormCtrl.setValue(category.description);
    this.selectedCategoeries = category.subCategories;

  }

  deleteSubcategory(category: any) {

    this.selectedCategoeries = this.selectedCategoeries.filter(element => {
      return element.id !== category.id;
    });
    console.log(this.selectedCategoeries);

  }

}
