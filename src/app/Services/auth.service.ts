import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../Models/DataModels';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPointURL: string = environment.endPointURL;
  userLogin: string = 'SampleUser/UserLogin';

  constructor(private  http: HttpClient) { }

 // baseServerUrl = "https://localhost:7056/api/";

  loginUser(loginInfo:Login){
    debugger;
    const url = `${this.endPointURL}${this.userLogin}`;
    return this.http.post(url,loginInfo);
   // return this.http.post(this.baseServerUrl+"UserMaster/Login",loginInfo)
  }
}
