import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLayoutComponent } from './components/product-layout/product-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/module/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ProductService } from './services/product.service';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { MatSelectModule } from '@angular/material/select';
import { PaymentOptionService } from './services/payment-option.service';
import { ProductOfferService } from './services/product-offer.service';

const routes: Routes = [
  { path: '', component: ProductLayoutComponent },
  { path: ':id/view', component: ProductViewComponent }
]

@NgModule({
  declarations: [ProductLayoutComponent, ProductListComponent, CreateProductComponent, ProductViewComponent],
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
    MatMenuModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [ProductService, PaymentOptionService, ProductOfferService]
})
export class ProductModule { }
