import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public username: string = '';
  constructor(public router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')!).Username;
  }

  navigateToMovieView() {
    this.router.navigate(['movies']);
  }

  navigateToProfileView() {
    this.router.navigate(['profile-view']);
  }

  logout() {
    this.dialog.closeAll();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
