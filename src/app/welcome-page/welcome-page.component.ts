import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Represents the Welcome Page component of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   *
   * @param dialog - The Angular Material Dialog service.
   * @param router - The Angular Router service.
   */
  constructor(public dialog: MatDialog, public router: Router) {}

  /**
   * Angular lifecycle hook called after component initialization.
   * Checks if a user is logged in and navigates to the 'movies' route if user data is present in local storage.
   */
  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.router.navigate(['movies']);
    }
  }

  /**
   * Opens the User Registration dialog.
   * Closes any existing dialogs and opens the registration dialog after a slight delay.
   */
  openUserRegistrationDialog(): void {
    this.dialog.closeAll();
    setTimeout(() => {
      this.dialog.open(UserRegistrationFormComponent, {
        width: '280px',
        panelClass: 'custom-dialog-class',
      });
    }, 100);
  }

  /**
   * Opens the User Login dialog.
   * Closes any existing dialogs and opens the login dialog after a slight delay.
   */
  openUserLoginDialog(): void {
    this.dialog.closeAll();
    setTimeout(() => {
      this.dialog.open(UserLoginFormComponent, {
        width: '280px',
        panelClass: 'custom-dialog-class',
      });
    }, 100);
  }
}
