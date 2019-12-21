import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class LoginBean {
  constructor(public username: string, public password: string) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  login(username, password) {
    return this.http.post("http://localhost:1234/user/login", new LoginBean(username, password));
  }
}
