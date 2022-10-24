import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListEditableHeaderComponent } from './components/list-header/list-editable-header/list-editable-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './components/list-table/list-table.component';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { RouteService } from './services/common/route.service';
import { CustomFieldModule } from './components/custom-field/custom-field.module';
import { CustomFieldInputComponent } from './components/custom-field/custom-field-input/custom-field-input.component';
import { CustomFieldComponent } from './components/custom-field/custom-field/custom-field.component';
import { AdminModule } from './components/admin/admin.module';
import { NgxEditorModule } from 'ngx-editor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GlobalSpinnerComponent } from './components/spinner/global-spinner.component';
import { GlobalSpinnerService } from './components/spinner/global-spinner.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './intercepters/http-error.interceptor';

@NgModule({
  declarations: [
    ListHeaderComponent,
    ListEditableHeaderComponent,
    ListTableComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    ListCardComponent,
    SpinnerComponent,
    GlobalSpinnerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CustomFieldModule,
    NgxEditorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    AdminModule,
  ],
  exports: [
    ListHeaderComponent,
    ListEditableHeaderComponent,
    ListTableComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    ListCardComponent,
    CustomFieldInputComponent,
    CustomFieldComponent,
    GlobalSpinnerComponent,
  ],
  providers: [
    DatePipe,
    RouteService,
    GlobalSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
