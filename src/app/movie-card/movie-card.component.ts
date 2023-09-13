import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Represents the Movie Card component.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * List of movies.
   */
  movies: any[] = [];

  /**
   * User data.
   */
  user: any = {};

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param fetchApiData - The service for making API calls related to movies.
   * @param dialog - The Angular Material Dialog service.
   * @param router - The Angular Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.getMovies();
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.router.navigate(['welcome']);
    }
  }

  /**
   * Retrieves a list of movies from the backend.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Shows a dialog with information about a genre.
   *
   * @param genre - The genre information to display in the dialog.
   */
  showGenre(genre: any): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: genre.name,
      dialogContent: genre.description,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  /**
   * Shows a dialog with information about a director.
   *
   * @param director - The director information to display in the dialog.
   */
  showDirector(director: any): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: director.name,
      dialogContent: director.bio,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  /**
   * Shows a dialog with information about a movie's plot.
   *
   * @param movie - The movie information to display in the dialog.
   */
  showPlot(movie: any): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: movie.title,
      dialogContent: movie.description,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  /**
   * Handles the change in favorite status of a movie.
   *
   * @param movieId - The ID of the movie for which the favorite status is being changed.
   */
  handleFavoriteChange(movieId: string): void {
    if (this.user.favoriteMovies.includes(movieId)) {
      this.fetchApiData
        .removeFromFavoriteMovies(this.user.Username, movieId)
        .subscribe((resp: any) => {
          this.user.favoriteMovies = resp;
          localStorage.setItem('user', JSON.stringify(this.user));
        });
    } else {
      this.fetchApiData
        .addToFavoriteMovies(this.user.Username, movieId)
        .subscribe((resp: any) => {
          this.user.favoriteMovies = resp;
          localStorage.setItem('user', JSON.stringify(this.user));
        });
    }
  }
}
