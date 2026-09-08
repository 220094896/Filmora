import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [FormsModule, RouterLink],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  name = '';

  email = '';

  password = '';

  confirmPassword = '';

  error = '';

  loading = false;

  register(): void {
    this.error = '';

    if (!this.name || !this.email || !this.password) {
      this.error = 'Please complete all fields.';

      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';

      return;
    }

    this.loading = true;

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;

        this.router.navigate(['/movies']);
      },

      error: (error) => {
        this.loading = false;

        this.error = error.error?.message || 'Registration failed.';
      },
    });
  }
}
