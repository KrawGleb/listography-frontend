import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListCardComponent } from './common/list-card/list-card.component';
import { ListCreateComponent } from './pages/list/create/create.component';
import { ListViewComponent } from './pages/list/view/view.component';
import { ListUpdateComponent } from './pages/list/update/update.component';
import { ItemDialogComponent } from './pages/list/update/item-dialog/item-dialog.component';
import { ItemComponent } from './pages/item/item/item.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './pages/account/account/account.component';
import { MyAccountComponent } from './pages/account/my-account/my-account.component';
import { ForeignAccountComponent } from './pages/account/foreign-account/foreign-account.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ListCardComponent,
    ListCreateComponent,
    ListViewComponent,
    ListUpdateComponent,
    ItemDialogComponent,
    ItemComponent,
    MyAccountComponent,
    ForeignAccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [
    ListUpdateComponent
  ]
})
export class ComponentsModule { }
