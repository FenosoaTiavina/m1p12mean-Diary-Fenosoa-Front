import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})


export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }

    private httpOptions = {
      withCredentials: true
    };
  login(credentials:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,credentials , this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({error : error.error.error}); // This is your fallback value
      })
    );
  }

  register(body:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`,body, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({error : error.error.error}); // This is your fallback value
      })
    );
  }
  verify():Observable<any>{
    return this.http.get(`${this.apiUrl}/protected`, this.httpOptions ).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error.ok === false){
          return of({ok:false})
        }
          return of({ok:true})
      })
    )
  }
}
