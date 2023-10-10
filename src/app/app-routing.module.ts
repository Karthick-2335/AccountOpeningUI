import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { DocumentComponent } from './document/document.component';
import { BankComponent } from './bank/bank.component';
import { authGuard } from 'src/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch:'full' },
  { path: 'registration', component: RegistrationComponent ,canActivate:[authGuard] },
  { path: 'profile', component: ProfileComponent ,canActivate:[authGuard]},
  { path: 'product', component: ProductComponent ,canActivate:[authGuard]},
  { path: 'document', component: DocumentComponent ,canActivate:[authGuard]},
  { path: 'bank', component: BankComponent ,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
