import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", redirectTo: 'home', pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"crypto-list", component:CryptoListComponent},
  {path:"crypto-details/:id", component:CryptoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
