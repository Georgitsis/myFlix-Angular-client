import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/**
 * Represents the Navbar component.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   * The username of the currently logged-in user.
   */
  public username: string = '';

  /**
   * Creates an instance of NavbarComponent.
   *
   * @param router - The Angular Router service for navigation.
   * @param dialog - The Angular Material Dialog service.
   */
  constructor(public router: Router, public dialog: MatDialog) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')!).Username;
  }

  /**
   * Navigates to the movie view.
   */
  navigateToMovieView() {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the profile view.
   */
  navigateToProfileView() {
    this.router.navigate(['profile-view']);
  }

  /**
   * Logs out the user.
   * Closes any open dialogs, removes user data from local storage, and navigates to the welcome page.
   */
  logout() {
    this.dialog.closeAll();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
