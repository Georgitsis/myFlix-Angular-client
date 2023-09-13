import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the User Registration Form component.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for user registration.
   */
  @Input() userData = { Username: '', Password: '', email: '', birthDate: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData - The service for making API calls related to user registration.
   * @param dialogRef - Reference to the Material Dialog for user registration.
   * @param snackBar - The Material Snackbar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the form inputs to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)

        // Close the modal on success
        this.dialogRef.close();

        console.log(result);

        // Display a success message to the user
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);

        // Display an error message to the user in case of registration failure
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
