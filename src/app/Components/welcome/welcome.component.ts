import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login, UserMaster } from 'src/app/Models/DataModels';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  currentUserInfo:any;
  //loggedInUser: User = new User();
  loggedInUser: any | UserMaster;
  public loginError: String='';
  logInNow: Login = new Login();

hideLoginSection:boolean=false;
hideSighUpSection:boolean=true;

constructor(private authService: AuthService,
  private notifyService:ToastService,
  private router: Router
  ) { }

ngOnInit(): void {
}


  hideUserCreateSection(typeOfAction: string){
    debugger;
    if(typeOfAction=='login'){
      this.hideLoginSection=true;
      this.hideSighUpSection=false;
    }else{
      this.hideSighUpSection=true;
      this.hideLoginSection=false;
    }

    this.hideSighUpSection
    this.hideLoginSection
   }

   loginClicked() {

    if(!this.logInNow.emailId || !this.logInNow.password){
      this.notifyService.showError(
        'Please enter user name and password',
        'Failed'
      );
      return;
    }
    debugger;
   //this.SpinnerService.show();
    let loginDetails = new Login();
    loginDetails.emailId = this.logInNow.emailId
    loginDetails.password = this.logInNow.password;
  
    this.authService.loginUser(loginDetails).subscribe((res) => {
      //console.log(res)
      debugger;
      this.loggedInUser = res;
      if (res && this.loggedInUser.userMasterId > 0) {
      localStorage.clear();
  
      localStorage.setItem('currentLoggedUser', JSON.stringify(res));
  
      let currentUserInfo = JSON.parse(localStorage.getItem("currentLoggedUser")|| '{}');
      this.currentUserInfo = currentUserInfo;
     
        this.router.navigate(['/Admin/SampleUser']);
       window.history.pushState({}, document.title, '/Admin/SampleUser');
      //window.location.reload();
  

      }
      else {
       // alert('Login Unsuccessfull');
  
  
       this.notifyService.showError(
        'Incorrect user name or password',
        'Failed'
      );
     
      }
    },err => {
     // alert('Login Unsuccessfull');
  
     this.notifyService.showError(
      'Incorrect user name or password',
      'Failed'
    );
  
  });
  }


}
