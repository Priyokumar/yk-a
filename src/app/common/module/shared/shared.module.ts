import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ConfirmationDialogComponent, FileUploadComponent, ImagePreviewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    ConfirmationDialogComponent,
    FileUploadComponent,
    ImagePreviewComponent
  ]
})
export class SharedModule { }
