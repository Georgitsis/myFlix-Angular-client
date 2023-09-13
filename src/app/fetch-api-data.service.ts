import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/';

/**
 * Service for making API calls to the backend.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a user registration request to the backend.
   *
   * @param userDetails - User registration details.
   * @returns An observable of the registration response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends a user login request to the backend.
   *
   * @param userDetails - User login details.
   * @returns An observable of the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    const params = new HttpParams()
      .set('Username', userDetails.Username)
      .set('Password', userDetails.Password);

    return this.http
      .post(apiUrl + 'login', null, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a list of all movies from the backend.
   *
   * @returns An observable of the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get(apiUrl + 'movies', { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves information about a single movie by title from the backend.
   *
   * @param movieTitle - The title of the movie to retrieve.
   * @returns An observable of the movie information.
   */
  public getSingleMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + movieTitle)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves information about a director from the backend.
   *
   * @param director - The name of the director to retrieve.
   * @returns An observable of the director information.
   */
  public getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + director)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves genre information for a movie by title from the backend.
   *
   * @param title - The title of the movie for which to retrieve genre information.
   * @returns An observable of the genre information.
   */
  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + title + '/genre')
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves user information from the backend.
   *
   * @param user - The username of the user to retrieve.
   * @returns An observable of the user information.
   */
  public getUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get(apiUrl + 'users/' + user, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves the favorite movies of a user from the backend.
   *
   * @param user - The username of the user to retrieve favorite movies for.
   * @returns An observable of the user's favorite movies.
   */
  public getFavoriteMovies(user: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + user + '/favorites')
      .pipe(catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorites list on the backend.
   *
   * @param user - The username of the user.
   * @param movieId - The ID of the movie to add to favorites.
   * @returns An observable of the updated user's favorite movies.
   */
  public addToFavoriteMovies(user: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .post(apiUrl + 'users/' + user + '/favorites/' + movieId, null, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's favorites list on the backend.
   *
   * @param user - The username of the user.
   * @param movieId - The ID of the movie to remove from favorites.
   * @returns An observable of the updated user's favorite movies.
   */
  public removeFromFavoriteMovies(
    user: string,
    movieId: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + 'users/' + user + '/favorites/' + movieId, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Edits user data on the backend.
   *
   * @param user - The username of the user.
   * @param userData - The updated user data.
   * @returns An observable of the updated user data.
   */
  public editUser(user: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .put(apiUrl + 'users/update/' + user, userData, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user on the backend.
   *
   * @param user - The username of the user to delete.
   * @returns An observable of the deletion response.
   */
  public deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + 'users/' + user, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors.
   *
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */
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
