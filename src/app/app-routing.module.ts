import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/common/auth/guards/auth.guard';
import { ForeignAccountComponent } from './modules/components/pages/account/foreign-account/foreign-account.component';
import { MyAccountComponent } from './modules/components/pages/account/my-account/my-account.component';
import { HomeComponent } from './modules/components/pages/home/home.component';
import { ItemComponent } from './modules/components/pages/item/item/item.component';
import { ListCreateComponent } from './modules/components/pages/list/create/create.component';
import { ListUpdateComponent } from './modules/components/pages/list/update/update.component';
import { ListViewComponent } from './modules/components/pages/list/view/view.component';
import { LoginComponent } from './modules/components/pages/login/login.component';
import { RegisterComponent } from './modules/components/pages/register/register.component';

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
    children: [{ path: ':id', component: ItemComponent }],
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
