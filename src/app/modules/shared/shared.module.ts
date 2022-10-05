import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListEditableHeaderComponent } from './components/list-header/list-editable-header/list-editable-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './components/list-table/list-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListHeaderComponent,
    ListEditableHeaderComponent,
    ListTableComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    ListHeaderComponent,
    ListTableComponent,
  ]
})
export class SharedModule { }
