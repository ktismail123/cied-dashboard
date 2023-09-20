import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserDetailsData } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user-services/user.service';
/**
 * Header Component for the application.
 * This component manages the header section of the application.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /** Array of subscriptions for managing observables. */
  subscription: Subscription[] = [];

  /** User details data. */
  userDetails!: IUserDetailsData;

  /** Currently active navigation link. */
  activeLink: string = 'dashboard'; // Set the initial active link

  /** Instance of AuthenticationService for handling user authentication. */
  private authService = inject(AuthenticationService);

  /** Instance of Router for navigation. */
  private router = inject(Router);

  /** Instance of UserService for managing user-related data. */
  private userService = inject(UserService);
 
  userImgae = 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png';

  /**
  * Initializes the component.
  * Calls `getUserDetails` to fetch user details.
  */
  ngOnInit(): void {
    this.getUserDetails();
  }

  /**
   * Fetches user details for the logged-in user.
   */
  getUserDetails(): void {
    const userId = localStorage.getItem('userId') || '';
    this.subscription.push(
      this.userService.userDetails(userId).subscribe({
        next: (res => {
          if (res.success) {
            this.userDetails = res.data;
            if(this.userDetails.image){
              this.userImgae = this.userDetails.image;
            }
          }
        })
      })
    );
  }

  /**
   * Sets the active navigation link and updates the UI.
   * @param link - The link to set as active.
   */
  setActiveLink(link: string): void {
    document.querySelector('.nav-link.active')?.classList.remove('active');
    this.activeLink = link;
  }

  /**
   * Logs out the user by calling the AuthenticationService.
   * Navigates to the login page after logout.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  /**
  * Unsubscribes from all subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
