import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

export interface MovieResponse {
  movies: Movie[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SingleMovieResponse {
  movie: Movie;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:5000/api/movies';

  getMovies(
    search?: string,
    genre?: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<MovieResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (search) {
      params = params.set('search', search);
    }

    if (genre) {
      params = params.set('genre', genre);
    }

    return this.http.get<MovieResponse>(this.API_URL, { params });
  }

  getMovieById(id: string): Observable<SingleMovieResponse> {
    return this.http.get<SingleMovieResponse>(`${this.API_URL}/${id}`);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post(this.API_URL, movie);
  }

  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, movie);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
