import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MovieService } from '../../core/services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, RouterLink],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);

  movies: Movie[] = [];

  loading = true;

  ngOnInit(): void {
    this.movieService.getMovies('', '', 1, 6).subscribe({
      next: (response) => {
        this.movies = response.movies;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }
}
