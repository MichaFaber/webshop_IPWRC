import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { GamesComponent } from './games/games.component';
import { DrinksComponent } from './drinks/drinks.component';
import { SnacksComponent } from './snacks/snacks.component';
import { ShoppingCartComponent } from './shoppingcart/shoppingcart.component';
import { RegisterComponent } from './register/register.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGuard } from './admin.guard';
import { PaidPageComponent } from './paid-page/paid-page.component';
import { ProductPageComponent } from './product-page/product-page.component'

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'snacks', component: SnacksComponent},
  { path: 'games', component: GamesComponent},
  { path: 'drinks', component: DrinksComponent },
  { path: 'winkelmandje', component: ShoppingCartComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'delete', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'create', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'thanks', component: PaidPageComponent},
  { path: 'products/:id', component: ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}