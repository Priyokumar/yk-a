import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from 'src/app/catalog/category/components/create-category/create-category.component';
import { ProductService } from '../../services/product.service';
import { FormControl, Validators } from '@angular/forms';
import { IProduct, IProductRequest } from '../../model/product.model';
import { ProductOfferService } from '../../services/product-offer.service';
import { CategoryService } from 'src/app/catalog/services/category.service';
import { ICategory } from 'src/app/catalog/category/model/category.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  id: string = null;
  nameFormCtrl = new FormControl('', Validators.required);
  categoryFormCtrl = new FormControl('', Validators.required);
  priceFormCtrl = new FormControl('', Validators.required);
  weightsFormCtrl = new FormControl('', Validators.required);
  customizableFormCtrl = new FormControl('', Validators.required);
  unitFormCtrl = new FormControl('', Validators.required);
  pcsFormCtrl = new FormControl('', Validators.required);

  showWeights = false;
  showPcs = false;
  categories: ICategory[] = [];
  weights = ['250grams', '500grams', '1kg'];
  pcs = ['1', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
  units = ['kg', 'pcs'];
  yesNo = [{ name: 'Yes', value: true }, { name: 'No', value: false }]

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProductRequest,
    private dialog: MatDialog,
    private productService: ProductService,
    private productOfferService: ProductOfferService,
    private categoryService: CategoryService
  ) {
    this.customizableFormCtrl.setValue(false);
    if (data) {
      this.updateFormData(data);
    }

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories({ topCategory: true }).subscribe(data => {
      this.categories = data.data;
    }, error => {
      console.log(error);
    })
  }

  close() {
    this.dialogRef.close();
  }

  onClickSave() {

    const reqPayload: IProductRequest = {
      name: this.nameFormCtrl.value,
      price: this.priceFormCtrl.value,
      customizable: this.customizableFormCtrl.value,
      weights: this.weightsFormCtrl.value ? this.weightsFormCtrl.value : null,
      pcs: this.pcsFormCtrl.value?this.pcsFormCtrl.value: null,
      unit: this.unitFormCtrl.value,
      categoryId: this.categoryFormCtrl.value,
      id: this.id,
      mediaId: null,
      totalQuantity: null 
    }

    let save$ = this.productService.saveProduct(reqPayload);

    if (this.id) {
      save$ = this.productService.updateProduct(this.id, reqPayload);
    }

    save$.subscribe(data => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error);
    })

  }

  updateFormData(data: IProductRequest) {
    this.id = data.id;
    this.nameFormCtrl.setValue(data.name);
    if(data.categoryId){
      this.categoryFormCtrl.setValue(data.categoryId);
    }
    this.customizableFormCtrl.setValue(data.customizable);
    this.priceFormCtrl.setValue(data.price);
    this.weightsFormCtrl.setValue(data.weights);
    this.pcsFormCtrl.setValue(data.pcs);
    
    this.unitFormCtrl.setValue(data.unit);

    if (this.unitFormCtrl.value === 'pcs') {
      this.showPcs = true;
      this.showWeights = false;
    } else {
      this.showPcs = false;
      this.showWeights = true;
    }

    this.pcsFormCtrl.setValue(data.pcs);
  }

  onUnitChange(value: string) {
    if (value === 'pcs') {
      this.showPcs = true;
      this.showWeights = false;
    } else {
      this.showPcs = false;
      this.showWeights = true;
    }
  }

}
