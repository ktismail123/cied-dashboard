import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormBody, IMyForm } from 'src/app/core/models/login';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

/**
 * * LoginComponent for user authentication.
 * This component manages the login form, form validation, and authentication process.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  /** FormGroup instance for managing the login form. */
  loginForm!: FormGroup;

  /** Array of subscriptions for managing observables. */
  subscription: Subscription[] = [];

  /** Flag for displaying toast messages. */
  showToast = false;

  /** Message to display in the toast. */
  toastMessage = '';

  /** Instance of AuthenticationService for handling user authentication. */
  private authService = inject(AuthenticationService);

  /** Instance of Router for navigation. */
  private router = inject(Router);

  /**
   * Initializes the component.
   * Calls `initForm` to set up the login form.
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the login form with form controls and validators.
   */
  initForm(): void {
    this.loginForm = new FormGroup<IMyForm>({
      username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  /**
   * Checks if a form field is invalid and has been touched.
   * @param fieldName - The name of the form field to check.
   * @returns True if the field is invalid and touched, otherwise false.
   */
  checkValidation(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].invalid && this.loginForm.controls[fieldName].touched
  }


  /**
   * Constructs the request body for form submission.
   * @returns The body object containing username, password, and device_id.
   */
  formBody(): IFormBody {
    const formValues = this.loginForm.value;
    return {
      username: formValues.username,
      password: formValues.password,
      device_id: 'fgdg'
    }
  }

  /**
   * Handles form submission when the user clicks the login button.
   * If the form is valid, it calls the AuthenticationService for login.
   * If successful, it saves the token and user ID, then navigates to the dashboard.
   * If an error occurs (e.g., 401 Unauthorized), it displays a toast message.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.subscription.push(
      this.authService.login(this.formBody()).subscribe({
        next: (res => {
          if (res.success) {
            this.authService.saveToken(res.data.token);
            this.authService.saveUserId(res.data.id);
            this.router.navigateByUrl('/dashboard/home');
          }
        }),
        error: (_err: HttpErrorResponse) => {
          console.log(_err);
          if (_err.error?.code === 401) {
            this.toastMessage = _err.error.detail?.detail;
            this.showToastMsg();
          }
        }
      })
    )
  }

  /**
  * Displays a toast message for a short duration.
  */
  showToastMsg(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;;
    }, 2000);
  }

  /**
  * Closes the toast message.
  */
  closeToast(): void {
    this.showToast = false;
  }

  /**
  * Unsubscribes from all subscriptions when the component is destroyed.
  */
  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
