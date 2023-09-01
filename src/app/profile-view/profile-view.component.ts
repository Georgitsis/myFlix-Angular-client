import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};
  movies: any[] = [];
  favoriteMoviesByTitle: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.generateFavoritesList();
    } else this.router.navigate(['welcome']);
  }

  generateFavoritesList(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const movies = resp;
      movies.forEach((movie: any) => {
        if (this.user.favoriteMovies.includes(movie._id))
          this.favoriteMoviesByTitle.push(movie.title);
      });
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.user.Username, this.updatedUser).subscribe(
      (resp: any) => {
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 3000,
        });
        localStorage.setItem('user', JSON.stringify(resp));
      },
      (result) => {
        // Logic for a unsuccessful user registration
        this.snackBar.open(result, 'OK', {
          duration: 3000,
        });
      }
    );
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      (resp: any) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
      },
      (result: any) => {
        // Logic for a unsuccessful user registration
        this.snackBar.open('wroooooong' /*result*/, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
