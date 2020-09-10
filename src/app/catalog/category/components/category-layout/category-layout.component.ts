import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-category-layout',
  templateUrl: './category-layout.component.html',
  styleUrls: ['./category-layout.component.scss']
})
export class CategoryLayoutComponent implements OnInit {

  refresh = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateCategoryDialog() {
    this.dialog.open(CreateCategoryComponent, { disableClose: true, width: '60%', autoFocus: false, data: {} }).afterClosed().subscribe(data => {
      if (data) {
        this.refresh = true;
      }
    })
  }

}
