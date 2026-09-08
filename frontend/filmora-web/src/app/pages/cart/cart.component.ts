import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';

import { RentalService } from '../../core/services/rental.service';

import { AuthService } from '../../core/services/auth.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-cart',
  standalone: true,

  imports: [CommonModule, RouterLink],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  private rentalService = inject(RentalService);

  private authService = inject(AuthService);

  private router = inject(Router);

  movies: Movie[] = [];

  message = '';

  error = '';

  loading = false;

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.movies = this.cartService.getCart();
  }

  remove(movieId: string): void {
    this.cartService.removeFromCart(movieId);

    this.refreshCart();
  }

  checkout(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return;
    }

    if (this.movies.length === 0) {
      return;
    }

    this.loading = true;

    let completed = 0;

    let failed = false;

    this.movies.forEach((movie) => {
      this.rentalService.createRental(movie._id).subscribe({
        next: () => {
          completed++;

          if (completed === this.movies.length && !failed) {
            this.cartService.clearCart();

            this.refreshCart();

            this.message = 'All movies rented successfully!';

            this.loading = false;
          }
        },

        error: (error) => {
          failed = true;

          this.error =
            error.error?.message || 'Some rentals could not be completed.';

          this.loading = false;
        },
      });
    });
  }
}
