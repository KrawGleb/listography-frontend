import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ForeignAccountComponent } from './modules/components/pages/account/foreign-account/foreign-account.component';
import { MyAccountComponent } from './modules/components/pages/account/my-account/my-account.component';
import { HomeComponent } from './modules/components/pages/home/home.component';
import { ItemComponent } from './modules/components/pages/item/item/item.component';
import { ListCreateComponent } from './modules/components/pages/list/create/create.component';
import { ListUpdateComponent } from './modules/components/pages/list/update/update.component';
import { ListViewComponent } from './modules/components/pages/list/view/view.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { CreateItemComponent } from './modules/components/pages/item/create-item/create-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: MyAccountComponent, canActivate: [AuthGuard] },
  {
    path: 'list',
    children: [
      { path: 'create', component: ListCreateComponent },
      { path: ':id', component: ListViewComponent },
      { path: 'update/:id', component: ListUpdateComponent },
    ],
  },
  {
    path: 'item',
    children: [
      {
        path: 'new',
        component: CreateItemComponent,
      },
      {
        path: 'edit/:id', component: CreateItemComponent
      },
      { path: ':id', component: ItemComponent },
    ],
  },
  {
    path: 'user',
    children: [{ path: ':username', component: ForeignAccountComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
