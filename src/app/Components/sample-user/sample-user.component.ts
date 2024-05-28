import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, UserMaster } from 'src/app/Models/DataModels';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-sample-user',
  templateUrl: './sample-user.component.html',
  styleUrls: ['./sample-user.component.css']
})
export class SampleUserComponent  {
  hidePopupButton:boolean=true;
  user:UserMaster= new UserMaster()
  userList:Array<UserMaster>=[];


  apiResponse : ApiResponse = new ApiResponse();
  searchedTextforUser:string='';
  timeout: any = null;
  currentUserInfo:any;
  @ViewChild('modalCloseButton') modalCloseButton: ElementRef<HTMLElement> | undefined;
  @ViewChild('confirmButton') confirmButton: ElementRef<HTMLElement> | undefined;
  @ViewChild('popupButton') popupButton: ElementRef<HTMLElement> | undefined;
  @ViewChild('modalConfirmCloseButton') modalConfirmCloseButton: ElementRef<HTMLElement> | undefined;
 

  
  constructor(private masterService: MasterDataService,
    private toastr: ToastService,
    private router: Router
  ) { }

  onKeySearch(Value:any){
    debugger;
    // clearTimeout(this.timeout);
    // var $this = this;
    // this.timeout = setTimeout(function () {
    //   // if (event.keyCode != 13) {
      const inputElement = Value.target as HTMLInputElement;
      const value = inputElement.value;
      //  $this.applySearchFilter(event.target.value);
    //   // }
      
    // }, 500);

    this.applySearchFilter(value);
  }

  applySearchFilter(filterValue: string) {
    debugger
    this.searchedTextforUser = filterValue;
    this.masterService.getSampleUserMasterList(this.searchedTextforUser).subscribe((result) => {
      this.userList = result as UserMaster[];
    });

  }

  ngOnInit(): void {
    debugger;

    let currentUserInfo = JSON.parse(localStorage.getItem("currentLoggedUser") || '{}');
    this.currentUserInfo = currentUserInfo;
    if (!currentUserInfo || !currentUserInfo.token) {
      this.router.navigate(['/']);
    }
//currentUserInfo.name

  this.getUserList();
  
    }
  

  async showModalPopup(typeOfModal: string) {
    debugger;
    if (typeOfModal == 'add') {
      this.user = new UserMaster();

    }
    if (typeOfModal === 'confirm') {
      let el: HTMLElement = this.confirmButton.nativeElement;
      el.click();
    } else {
      let el: HTMLElement = this.popupButton.nativeElement;
      el.click();
    }
  }

  async openEditPopup(UserMaster: UserMaster) {
    debugger;
    this.user = UserMaster;
    this.showModalPopup('edit');
  }

  async openConfirmPopup(userMasterId: number) {
    debugger;
    this.user.userMasterId = userMasterId;
    this.showModalPopup('confirm');
  }

  saveUser() {
    debugger;
    if(this.user.password.length< 6){
      this.toastr.showError('Password must be at least 6 characters long!', 'Required');
      return;
    }
    if (!this.user.userName) {
      this.toastr.showError('Name code is required!', 'Required');
      return;
    }
    if (!this.user.emailID) {
      this.toastr.showError('EmailId name is required!', 'Required');
      return;
    }
    if (!this.user.password) {
      this.toastr.showError('Password name is required!', 'Required');
      return;
    }

    if (this.user.userMasterId > 0) {
      //put request
     
      var result = this.masterService.updateSampleUser(this.user).subscribe((result: any) => {
        debugger;
        if (result) {
          this.apiResponse = result;
          if(this.apiResponse.status)
          this.user = new UserMaster();
          this.getUserList();
          let el: HTMLElement = this.modalCloseButton.nativeElement;
          el.click();
          this.toastr.showSuccess('User updated successfully!', 'Success');
        } else {
          this.toastr.showError('Some error occured, please check if User alredy exists.', 'Error');
        }
      }, () => {
        this.toastr.showError(
          'User already exists',
          'Failed'
        );
      });
    }
    else {
      //add request
      var result = this.masterService.addSampleUser(this.user).subscribe((result: any) => {
        debugger;
        if (result) {
          this.user = new UserMaster();
          this.getUserList();
          let el: HTMLElement = this.modalCloseButton.nativeElement;
          el.click();
          this.toastr.showSuccess('User added successfully!', 'Success');
        } else {
          this.toastr.showError('Some error occured, please check if fee User code alredy exists.', 'Error');
        }

      }, () => {
        this.toastr.showError(
          'User already exists',
          'Failed'
        );
      });
    }
  }

  deleteUser() {
    debugger;
    var result = this.masterService.deleteSampleUser(this.user.userMasterId).subscribe((result: any) => {
      debugger;
      if (result) {
        this.user = new UserMaster();
        this.getUserList();
        let el: HTMLElement = this.modalConfirmCloseButton.nativeElement;
        el.click();
        this.toastr.showSuccess('User deleted successfully!', 'Success');
      } else {
        this.toastr.showError('Some error occured while deleting.', 'Error');
      }
    });
  }

  getUserList() {
    debugger;
    this.masterService.getSampleUserMasterList(this.searchedTextforUser).subscribe((result) => {
      this.apiResponse = result as any;
      this.userList = this.apiResponse.data
      debugger;
    });
  }

}

