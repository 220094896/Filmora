import { Movie } from './movie';

export interface Rental {
  _id: string;
  userId: string;

  movieId: Movie;

  rentalDate: string;
  dueDate: string;
  returnDate?: string;

  status: 'active' | 'returned' | 'overdue';

  createdAt?: string;
  updatedAt?: string;
}
