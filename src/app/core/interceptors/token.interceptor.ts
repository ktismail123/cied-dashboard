import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.getToken();
    const userId = this.getUserId();

    if (token) {
      request = request.clone({
        setHeaders: {
          BEARER: `${token}`,
          'USER-ID': `${userId}`
        }
      });
    }

    return next.handle(request);
  }

  /** function to get the token*/
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  /** function to get the token*/
  private getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
