import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user registration endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    const params = new HttpParams()
      .set('Username', userDetails.Username)
      .set('Password', userDetails.Password);

    return this.http
      .post(apiUrl + 'login', null, { params })
      .pipe(catchError(this.handleError));
  }

  //Making the api call to get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }

  //Making the api call to get one single movie by title
  public getSingleMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + movieTitle)
      .pipe(catchError(this.handleError));
  }

  //making api call to get information on director
  public getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + director)
      .pipe(catchError(this.handleError));
  }

  //get info about the genre by providing a movie title
  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + title + '/genre')
      .pipe(catchError(this.handleError));
  }

  //get user*
  public getUser(user: string): Observable<any> {
    return this.http.get(apiUrl + user).pipe(catchError(this.handleError));
  }

  //get favorite movies of a user*
  public getFavoriteMovies(user: string): Observable<any> {
    return this.http
      .get(apiUrl + user + '/favorites')
      .pipe(catchError(this.handleError));
  }

  //Add a movie to the users favorites list
  public addToFavoriteMovies(user: string, title: string): Observable<any> {
    return this.http
      .post(apiUrl + 'users/' + user + '/favorites/' + title, null)
      .pipe(catchError(this.handleError));
  }

  //Remove a movie from the users favorites list
  public removeFromFavoriteMovies(
    user: string,
    title: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + user + '/favorites/' + title)
      .pipe(catchError(this.handleError));
  }

  //edit user data
  public editUser(user: string, userData: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/update/' + user, userData)
      .pipe(catchError(this.handleError));
  }

  //delete User
  public deleteUser(user: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
