export interface Genre {
  _id: string;
  name: string;
  description?: string;
}

export interface Movie {
  _id: string;
  title: string;
  description: string;
  genreId: Genre;
  releaseYear: number;
  director: string;
  cast: string[];
  duration: number;
  rating: number;
  rentalPrice: number;
  image?: string;
  totalCopies: number;
  availableCopies: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
