import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Represents the User Login Form component.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input data for user login.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param fetchApiData - The service for making API calls related to user login.
   * @param dialogRef - Reference to the Material Dialog for user login.
   * @param snackBar - The Material Snackbar service for displaying notifications.
   * @param router - The Angular Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Logs in a user by sending the login form inputs to the backend.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        // Logic for a successful user login

        // Close the modal on success
        this.dialogRef.close();

        // Store the authentication token and user data in local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Display a success message to the user
        this.snackBar.open(result.user.Username + ' logged in!', 'OK', {
          duration: 3000,
        });

        // Navigate to the 'movies' route after successful login
        this.router.navigate(['movies']);
      },
      (result) => {
        // Logic for an unsuccessful user login

        // Display an error message to the user in case of login failure
        this.snackBar.open(result, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
