import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  outOfStock: string = "/out_of_stock.png"

  constructor(
    private http: HttpClient,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(Number(productId));
    }
  }

  fetchProduct(id: number): void {
    const url = `http://localhost:3000/api/products/${id}`;
    this.http.get<Product>(url).subscribe(data => {
      this.product = data;
    }, error => {
      console.error('Error fetching product details:', error);
    });
  }
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
