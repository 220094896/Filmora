import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:5000/api/rentals';

  createRental(movieId: string): Observable<any> {
    return this.http.post(this.API_URL, {
      movieId,
    });
  }

  getMyRentals(): Observable<{ rentals: Rental[] }> {
    return this.http.get<{ rentals: Rental[] }>(`${this.API_URL}/my-rentals`);
  }

  returnMovie(id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/return`, {});
  }
}
