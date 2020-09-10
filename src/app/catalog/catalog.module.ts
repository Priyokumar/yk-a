import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './components/catalog/catalog.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from './services/category.service';

const routes: Routes = [
  {
    path: '', component: CatalogComponent, children:
      [
        { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }
      ]
  }]

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule

  ],
  providers: [CategoryService]
})
export class CatalogModule { }
