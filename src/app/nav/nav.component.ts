import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component';
import { ApplyComponent } from '../apply/apply.component';
import { LogInComponent } from '../forms/log-in/log-in.component';
import { SignUpComponent } from '../forms/sign-up/sign-up.component';
import { onAuthStateChanged, Auth, getAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    RouterLink,
    RouterOutlet,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  constructor( private cdr: ChangeDetectorRef) {}

  router = inject(Router);
  authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if(user) {
        this.loggedIn = true;
        if (user.email === "rryanwwang@gmail.com") {
          this.adminState = true;
        }
      } else {
        this.loggedIn = false;
      }
      this.cdr.detectChanges();
    })
  }

  loggedIn: boolean = false;
  adminState: boolean = false;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  readonly dialog = inject(MatDialog);

  logIn() {
    this.dialog.open(LogInComponent);
  }

  signUp() {
    this.dialog.open(SignUpComponent);
  }
  logOut() {
    this.authService.logOut();
    this.loggedIn = false;
    this.adminState = false;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/home');
  }
}
