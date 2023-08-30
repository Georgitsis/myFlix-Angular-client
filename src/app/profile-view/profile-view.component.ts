import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMoviesByTitle: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.generateFavoritesList();
      console.log(this.favoriteMoviesByTitle);
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
}
