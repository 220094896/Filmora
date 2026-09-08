import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'filmora_cart';

  getCart(): Movie[] {
    const cart = localStorage.getItem(this.CART_KEY);

    if (!cart) {
      return [];
    }

    try {
      return JSON.parse(cart);
    } catch {
      return [];
    }
  }

  addToCart(movie: Movie): boolean {
    const cart = this.getCart();

    const exists = cart.some((item) => item._id === movie._id);

    if (exists) {
      return false;
    }

    cart.push(movie);

    this.saveCart(cart);

    return true;
  }

  removeFromCart(movieId: string): void {
    const cart = this.getCart().filter((movie) => movie._id !== movieId);

    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (total, movie) => total + movie.rentalPrice,
      0,
    );
  }

  getCount(): number {
    return this.getCart().length;
  }

  private saveCart(cart: Movie[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
}
