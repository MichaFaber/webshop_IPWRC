import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-paid-page',
  templateUrl: './paid-page.component.html',
  styleUrls: ['./paid-page.component.css']
})
export class PaidPageComponent implements OnInit {
  boughtItems: any[] = [];
  useremail: string | null = null;
  username: string | null = null;

  constructor(private router: Router, private cd: ChangeDetectorRef, public authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.useremail = user.email;
      this.username = user.name
    }
  }

  getTotal(): number {
    return this.boughtItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
