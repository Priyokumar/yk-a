import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryLayoutComponent } from './components/category-layout/category-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TopCategoriesComponent } from './components/top-categories/top-categories.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SharedModule } from 'src/app/common/module/shared/shared.module';

const routes: Routes = [{ path: '', component: CategoryLayoutComponent }]

@NgModule({
  declarations: [CategoryLayoutComponent, TopCategoriesComponent, CategoriesComponent, CreateCategoryComponent, CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule

  ],
  entryComponents: [
    CreateCategoryComponent,
    CategoryListComponent
  ]
})
export class CategoryModule { } 
