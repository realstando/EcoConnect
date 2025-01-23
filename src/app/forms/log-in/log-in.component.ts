import { Component, inject, ViewChild, ViewChildren } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { signInWithEmailAndPassword, Auth } from "@angular/fire/auth";
import { NavComponent } from '../../nav/nav.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class LogInComponent {
  constructor(private dialogRef: MatDialogRef<LogInComponent>, private auth: Auth) {
  }

  // @ViewChild(NavComponent) navComponent!: NavComponent;
  authService = inject(AuthService);

  private fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  onSubmit(): void {
    const rawForm = this.loginForm.getRawValue();
    this.dialogRef.close();
    if (rawForm.email && rawForm.password) {
      this.authService.login(rawForm.email, rawForm.password);
    }
  }
}
