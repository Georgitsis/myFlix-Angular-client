import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.getMovies();
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else this.router.navigate(['welcome']);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  showGenre(genre: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: genre.name,
      dialogContent: genre.description,
    };
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  showDirector(director: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: director.name,
      dialogContent: director.bio,
    };
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  showPlot(movie: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: movie.title,
      dialogContent: movie.description,
    };
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  handleFavoriteChange(movieId: string): void {
    //const userName = this.UserDataService.getUserData().Username;
    if (this.user.favoriteMovies.includes(movieId))
      this.fetchApiData
        .removeFromFavoriteMovies(this.user.Username, movieId)
        .subscribe((resp: any) => {
          this.user.favoriteMovies = resp;
          localStorage.setItem('user', JSON.stringify(this.user));
        });
    else
      this.fetchApiData
        .addToFavoriteMovies(this.user.Username, movieId)
        .subscribe((resp: any) => {
          this.user.favoriteMovies = resp;
          localStorage.setItem('user', JSON.stringify(this.user));
        });
  }
}
