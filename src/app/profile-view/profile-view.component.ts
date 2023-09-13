import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Represents the Profile View component.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
   * User data.
   */
  user: any = {};

  /**
   * Updated user data.
   */
  updatedUser: any = {};

  /**
   * List of movies.
   */
  movies: any[] = [];

  /**
   * List of favorite movies by title.
   */
  favoriteMoviesByTitle: any[] = [];

  /**
   * Creates an instance of ProfileViewComponent.
   *
   * @param fetchApiData - The service for making API calls related to user profile.
   * @param router - The Angular Router service for navigation.
   * @param snackBar - The Material Snackbar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.generateFavoritesList();
    } else {
      this.router.navigate(['welcome']);
    }
  }

  /**
   * Generates a list of favorite movies based on user preferences.
   */
  generateFavoritesList(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const movies = resp;
      movies.forEach((movie: any) => {
        if (this.user.favoriteMovies.includes(movie._id)) {
          this.favoriteMoviesByTitle.push(movie.title);
        }
      });
    });
  }

  /**
   * Updates user profile information.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.user.Username, this.updatedUser).subscribe(
      (resp: any) => {
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 3000,
        });
        localStorage.setItem('user', JSON.stringify(resp));
      },
      (result) => {
        // Logic for an unsuccessful user update
        this.snackBar.open(result, 'OK', {
          duration: 3000,
        });
      }
    );
  }

  /**
   * Deletes the user's account.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      (resp: any) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
      },
      (result: any) => {
        // Logic for an unsuccessful user deletion
        this.snackBar.open('User deletion failed' /*result*/, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
