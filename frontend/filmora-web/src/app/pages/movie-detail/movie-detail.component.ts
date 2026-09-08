import { Component, OnInit, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MovieService } from '../../core/services/movie.service';

import { CartService } from '../../core/services/cart.service';

import { AuthService } from '../../core/services/auth.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private movieService = inject(MovieService);

  cartService = inject(CartService);

  authService = inject(AuthService);

  movie: Movie | null = null;

  loading = true;

  message = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/movies']);
      return;
    }

    this.movieService.getMovieById(id).subscribe({
      next: (response) => {
        this.movie = response.movie;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }

  addToCart(): void {
    if (!this.movie) {
      return;
    }

    const added = this.cartService.addToCart(this.movie);

    if (added) {
      this.message = 'Movie added to your cart.';
    } else {
      this.message = 'This movie is already in your cart.';
    }
  }
}
