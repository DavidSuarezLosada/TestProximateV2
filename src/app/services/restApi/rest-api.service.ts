import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../../Interface/Login';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private colmenaUrl = 'http://45.35.12.211';  // URL para web api


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }
  
  postLogin(login: Login): Observable<any> {
    // console.log(login);
    const url = `${this.colmenaUrl}/Services/authorization/login`
    return this.http.post<Login>(url, login, this.httpOptions).pipe(
      catchError(this.handleError<Login>('postLogin'))
    );
  }

  getProducts(): Observable<any> {
    const url = `${this.colmenaUrl}/Services/Insurance`;
    return this.http.get(url).pipe(
      catchError(this.handleError(`getMenu`))
    );
  }

}
