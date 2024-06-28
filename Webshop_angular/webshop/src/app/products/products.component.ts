import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { ShoppingCartService } from '../shopping-cart.service'
import { NotificationService } from '../notification.service'
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  type: string | null = null;

  constructor(
      private http: HttpClient, 
      private cartService: ShoppingCartService, 
      private route: ActivatedRoute,
      private router: Router, 
      private notificationService: NotificationService,
      private cdr: ChangeDetectorRef,  
    ) {}
  
  ngOnInit(): void {
    this.route.data.subscribe(data => {
        this.fetchProducts();
    });

    this.route.params.subscribe(() => {
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    const url ='http://localhost:3000/api/products';
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
