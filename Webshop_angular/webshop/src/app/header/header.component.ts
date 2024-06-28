import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  username: string | null = null;
  private authSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.username;
    }

    this.authSubscription = this.authService.userLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const user = this.authService.getUser();
        if (user) {
          this.username = user.username;
        }
      } else {
        this.username = null;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}