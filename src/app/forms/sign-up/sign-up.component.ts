import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class SignUpComponent {
  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>,
    private auth: Auth
  ) {}

  authService = inject(AuthService);
  router = inject(Router);

  private fb = inject(FormBuilder);
  signupForm = this.fb.nonNullable.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    name: [null, Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.signupForm.getRawValue();
    this.dialogRef.close();
    if (rawForm.email && rawForm.password && rawForm.name) {
      this.authService
        .register(rawForm.email, rawForm.password, rawForm.name)
        .subscribe(() => {});
    }
  }
}
