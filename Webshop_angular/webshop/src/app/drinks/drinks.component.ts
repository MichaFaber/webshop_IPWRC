import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { ShoppingCartService } from '../shopping-cart.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-drinks',
  templateUrl: '../products/products.component.html',
  styleUrls: ['../products/products.component.css']
})
export class DrinksComponent implements OnInit {
  products: Product[] = [];
  type: string | null = null;
  constructor(
    private http: HttpClient, 
    private cartService: ShoppingCartService, 
    private route: ActivatedRoute, 
    private router: Router,
    private notificationService: NotificationService,
  ) {}
    
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.type = data['type'] || null;
      this.fetchProducts();
    });

    this.route.params.subscribe(() => {
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    const url = '/backend/api/products?type=Drink';
    this.http.get<Product[]>(url).subscribe(data => {
      this.products = data;
    }, error => {
      console.error('Error fetching products:', error);
    });
  }
  
  addToCart(product: Product): void {
    if (product.amountinstock > 0) {
      this.cartService.addToCart(product);
      product.amountinstock -= 1; 
      this.notificationService.showNotification(`${product.name} is added to the cart.`);
    } else {
      this.notificationService.showNotification(`${product.name} is out of stock and cannot be added to the cart.`);
    }
  }
  
  viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}