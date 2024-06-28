import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component'
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { SnacksComponent } from './snacks/snacks.component';
import { DrinksComponent } from './drinks/drinks.component';
import { GamesComponent } from './games/games.component';
import { ShoppingCartComponent } from './shoppingcart/shoppingcart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGuard } from './admin.guard';
import { PaidPageComponent } from './paid-page/paid-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'snacks', component: SnacksComponent},
  { path: 'drinks', component: DrinksComponent },
  { path: 'games', component: GamesComponent },
  { path: 'winkelmandje', component: ShoppingCartComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'thanks', component: PaidPageComponent},
  { path: 'delete', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'products/:id', component: ProductPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SnacksComponent,
    DrinksComponent,
    GamesComponent,
    ShoppingCartComponent,
    AdminPageComponent,
    PaidPageComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }