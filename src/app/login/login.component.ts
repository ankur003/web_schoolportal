import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  isValidLogin = false;
  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit() {
   
  }

  

  handleLogin() {
    console.log(this.username);
    console.log(this.password);
    this.loginService.login(this.username, this.password).subscribe((res: any[]) => {
      this.handleSuccessLoginResponse(res)
    }, error => {
      console.log("ERROR  ", error)
      this.handleFailedLoginResponse(error)
    });

  }

  handleSuccessLoginResponse(response) {
    localStorage.setItem("usertype", response.responseObject.userType);
    localStorage.setItem("userEmail", response.responseObject.userName);
    localStorage.setItem("token", response.responseObject.token);
    if (response.responseObject.userType === 'PRINCIPLE') {
      this.toastr.success('Success', response.responseObject.token);
      this.router.navigate[('login')]
    }
    if (response.responseObject.userType === 'TEACHER') {

    }
    if (response.responseObject.userType === 'STUDENT') {

    }
  }

  handleFailedLoginResponse(error) {
    this.isValidLogin = true;
    this.toastr.error('In Valid Login', 'Try Again');
    this.router.navigate[('login')]
  }

}
