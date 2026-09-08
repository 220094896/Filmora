import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RentalService } from '../../core/services/rental.service';

import { Rental } from '../../models/rental';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rentals',
  standalone: true,

  imports: [CommonModule, DatePipe],

  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css',
})
export class RentalsComponent implements OnInit {
  private rentalService = inject(RentalService);

  rentals: Rental[] = [];

  loading = true;

  message = '';

  error = '';

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getMyRentals().subscribe({
      next: (response) => {
        this.rentals = response.rentals;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.error = 'Unable to load your rentals.';

        this.loading = false;
      },
    });
  }

  returnMovie(id: string): void {
    if (!confirm('Are you sure you want to return this movie?')) {
      return;
    }

    this.rentalService.returnMovie(id).subscribe({
      next: (response) => {
        this.message = response.message || 'Movie returned successfully.';

        this.loadRentals();
      },

      error: (error) => {
        this.error = error.error?.message || 'Unable to return movie.';
      },
    });
  }
}
