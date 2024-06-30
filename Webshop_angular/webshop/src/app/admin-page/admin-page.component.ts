import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { AuthService } from '../auth.service';
import { Product } from '../product.model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];
  currentSection: string = 'overview';
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    type: '',
    price: 0,
    amountinstock: 0,
    imageurl: ''
  };
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService, 
    public authService: AuthService, 
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        imageurl: `${product.imageurl}`
      }));
    });
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      () => {
        this.notificationService.showNotification(`${product.name} is succesvol aangepast`);
        console.log(`${product.name} updated successfully`);
      },
      error => {
        this.notificationService.showNotification(`Error bij het aanpassen van: ${product.name}: ${error.error.error}`);
        console.error(`Error updating ${product.name}:`, error.error.error);
      }
    );
  }

  showSection(section: string): void {
    this.currentSection = section;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  createProduct(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('name', this.newProduct.name);
      formData.append('description', this.newProduct.description);
      formData.append('type', this.newProduct.type);
      formData.append('price', this.newProduct.price.toString());
      formData.append('amountinstock', this.newProduct.amountinstock.toString());

      this.productService.createProduct(formData).subscribe(
        product => {
          console.log('Product created:', product);
          this.fetchProducts();
          this.clearForm();
          this.router.navigate(['login'])
        },
        error => {
          console.error('Error creating product:', error);
        }
      );
    } else {
      console.error('Image file is required');
    }
  }

  clearForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      type: '',
      price: 0,
      amountinstock: 0,
      imageurl: ''
    };
    this.selectedFile = null;
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.notificationService.showNotification(`${product.name} succesvol verwijderd`);
        this.fetchProducts();
      },
      error => {
        this.notificationService.showNotification(`Error bij het verwijderen van ${product.name}: ${error.error.error}`);
        console.error(`Error deleting ${product.name}:`, error.error.error);
      }
    )
  }
}
