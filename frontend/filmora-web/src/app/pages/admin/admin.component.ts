import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MovieService } from '../../core/services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-admin',
  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private movieService = inject(MovieService);

  movies: Movie[] = [];

  editing = false;

  editingId = '';

  message = '';

  error = '';

  loading = false;

  movieForm: any = {
    title: '',
    description: '',
    genreId: '',
    releaseYear: 2020,
    director: '',
    cast: '',
    duration: 120,
    rating: 0,
    rentalPrice: 30,
    image: '',
    totalCopies: 1,
  };

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies('', '', 1, 100).subscribe({
      next: (response) => {
        this.movies = response.movies;
      },

      error: (error) => {
        console.error(error);

        this.error = 'Unable to load movies.';
      },
    });
  }

  submitMovie(): void {
    this.message = '';
    this.error = '';

    if (
      !this.movieForm.title ||
      !this.movieForm.description ||
      !this.movieForm.genreId ||
      !this.movieForm.director
    ) {
      this.error = 'Please complete all required fields.';

      return;
    }

    const data = {
      ...this.movieForm,

      cast: this.movieForm.cast
        .split(',')
        .map((name: string) => name.trim())
        .filter((name: string) => name),

      releaseYear: Number(this.movieForm.releaseYear),

      duration: Number(this.movieForm.duration),

      rating: Number(this.movieForm.rating),

      rentalPrice: Number(this.movieForm.rentalPrice),

      totalCopies: Number(this.movieForm.totalCopies),
    };

    this.loading = true;

    if (this.editing) {
      this.movieService.updateMovie(this.editingId, data).subscribe({
        next: (response) => {
          this.message = response.message || 'Movie updated successfully.';

          this.resetForm();

          this.loadMovies();
        },

        error: (error) => {
          this.error = error.error?.message || 'Unable to update movie.';

          this.loading = false;
        },
      });
    } else {
      this.movieService.createMovie(data).subscribe({
        next: (response) => {
          this.message = response.message || 'Movie created successfully.';

          this.resetForm();

          this.loadMovies();
        },

        error: (error) => {
          this.error = error.error?.message || 'Unable to create movie.';

          this.loading = false;
        },
      });
    }
  }

  editMovie(movie: Movie): void {
    this.editing = true;

    this.editingId = movie._id;

    this.movieForm = {
      title: movie.title,

      description: movie.description,

      genreId: movie.genreId?._id || '',

      releaseYear: movie.releaseYear,

      director: movie.director,

      cast: movie.cast.join(', '),

      duration: movie.duration,

      rating: movie.rating,

      rentalPrice: movie.rentalPrice,

      image: movie.image || '',

      totalCopies: movie.totalCopies,
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  deleteMovie(id: string): void {
    if (!confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    this.movieService.deleteMovie(id).subscribe({
      next: (response) => {
        this.message = response.message || 'Movie deleted successfully.';

        this.loadMovies();
      },

      error: (error) => {
        this.error = error.error?.message || 'Unable to delete movie.';
      },
    });
  }

  resetForm(): void {
    this.editing = false;

    this.editingId = '';

    this.loading = false;

    this.movieForm = {
      title: '',
      description: '',
      genreId: '',
      releaseYear: 2020,
      director: '',
      cast: '',
      duration: 120,
      rating: 0,
      rentalPrice: 30,
      image: '',
      totalCopies: 1,
    };
  }
}
