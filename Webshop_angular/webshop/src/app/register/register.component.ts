import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'customer';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    console.log('Registering with role:', this.role);
    this.authService.register(this.username, this.password, this.email, this.role).subscribe(
      response => {
        this.router.navigate(['login']);
      },
      error => {
        alert('Registration failed');
      }
    );
  }
}
