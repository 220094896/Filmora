import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { MovieService } from '../../core/services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  standalone: true,

  imports: [CommonModule, FormsModule, RouterLink],

  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  private movieService = inject(MovieService);

  movies: Movie[] = [];

  search = '';

  genre = '';

  loading = false;

  error = '';

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.error = '';

    this.movieService.getMovies(this.search, this.genre).subscribe({
      next: (response) => {
        this.movies = response.movies;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.error = 'Unable to load movies. Please try again.';

        this.loading = false;
      },
    });
  }

  searchMovies(): void {
    this.loadMovies();
  }

  filterGenre(genre: string): void {
    this.genre = genre;

    this.loadMovies();
  }
}
