import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedUserName:string='';
  isSuperUser:boolean=true;
  currentUserInfo:any;
  constructor( private router: Router) { }



  ngOnInit(): void {


    let currentUserInfo = JSON.parse(localStorage.getItem("currentLoggedUser") || '{}');
    this.currentUserInfo = currentUserInfo;
    this.loggedUserName = this.currentUserInfo.userName;
    if (!currentUserInfo || !currentUserInfo.token) {
      this.router.navigate(['/']);
    }

    

  }
  

  signOut(){
    debugger;
    localStorage.clear();
    this.router.navigate(['/']);
  }

}

