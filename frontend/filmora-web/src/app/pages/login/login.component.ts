import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [FormsModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  email = '';

  password = '';

  error = '';

  loading = false;

  login(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please enter your email and password.';

      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/movies']);
        }
      },

      error: (error) => {
        this.loading = false;

        this.error =
          error.error?.message || 'Login failed. Please check your details.';
      },
    });
  }
}
