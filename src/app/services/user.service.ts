import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private httpOptions = {
      withCredentials : true,
  };
  verifyCurrentUser():Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/refresh`).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({error : error.error}); // This is your fallback value
      })
    );
  }
  getCurrentUser():Observable<any> {
    const user_id =      localStorage.getItem('userId');
    // if no userID verify user,
    return this.http.get(`${this.apiUrl}/${user_id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({error : error.error.error}); // This is your fallback value
      })
    );
  }
}
