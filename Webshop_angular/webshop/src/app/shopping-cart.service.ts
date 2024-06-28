import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: { product: Product; quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product; quantity: number }[]>(this.cart);

  constructor(private notificationService: NotificationService) {}

  addToCart(product: Product): void {         
    const cartItem = this.cart.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
    this.notificationService.showNotification(`${product.name} Toegevoegd aan winkelmandje`);
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]);
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }

  getCart(): Observable<{ product: Product; quantity: number }[]> {
    return this.cartSubject.asObservable();
  }
}