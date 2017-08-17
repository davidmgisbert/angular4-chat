import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  authenticated: boolean;

  constructor(
    private http: Http,
    private router: Router,
  ) { }

  checkAuth(username: string, password: string) {
    // Expose HTTP headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Make the call to the authentication API
    this.http.get(`http://localhost:4201/api/authenticate/${username}/${password}`, { headers: headers })
      .toPromise()
      .then(response => {
        this.authenticated = response.json() as boolean;
        if (this.authenticated) {
          localStorage.setItem('user', username);
          this.router.navigateByUrl('chat');
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
