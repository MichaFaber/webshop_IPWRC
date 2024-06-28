import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { NotificationService } from '../notification.service'
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface CheckoutResponse {
  boughtItems: any[];
  email: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient, 
    private router: Router, 
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  checkout(): void {
  const checkoutUrl = 'http://localhost:3000/api/checkout';
  const items = this.cartItems.map(item => ({
    product: { id: item.product.id },
    quantity: item.quantity
  }));

    this.http.post<CheckoutResponse>(checkoutUrl, { items }).subscribe(
    (response: CheckoutResponse) => {
      this.clearCart();
      this.router.navigate(['/thanks'], { state: { boughtItems: response.boughtItems, email: response.email } });
    },
    error => {
      this.notificationService.showNotification(`Error bij kopen van ${this.cartItems}: ${error.error.error}`);
      console.error('Checkout error', error);
    });
  }
}