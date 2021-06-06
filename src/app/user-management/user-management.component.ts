import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsReturned } from '../dashboard/models/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  savedUserDetails: UserDetailsReturned;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.savedUserDetails = this.authenticationService.getUserDetails();
    console.log(this.savedUserDetails);
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
