import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";

/**
 * AuthGuard is a service that implements CanActivate interface to control access to routes.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor for AuthGuard service.
   * @param authService - The AuthenticationService used for checking authentication status.
   * @param router - The Angular Router service for navigation.
   */
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Determines whether the user is allowed to activate a route.
   * @returns A boolean indicating whether the user is allowed to activate the route.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
