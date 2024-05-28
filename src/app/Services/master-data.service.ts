import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserMaster } from '../Models/DataModels';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  endPointURL: string = environment.endPointURL;
  getSampleUser:string='SampleUser/GetAllSampleUsers';
  addNewSampleUser:string='SampleUser/CreateSampleUser';
  updateSampleUsers:string='SampleUser/UpdateSampleUser';
  deleteSampleUsers:string='SampleUser/DeleteSampleUser';
  getSampleUserById:string='SampleUser/GetSampleUserById';



  constructor(private http: HttpClient) { }

  getSampleUserMasterList(searchText:string){
    debugger
    const url = `${this.endPointURL}${this.getSampleUser}?searchText=${searchText}`;
    return this.http.get(url);
  }

  updateSampleUser(user: UserMaster) {
    const url = `${this.endPointURL}${this.updateSampleUsers}`;
    return this.http.put(url, user);
}

addSampleUser(user: UserMaster) {
    const url = `${this.endPointURL}${this.addNewSampleUser}`;
    return this.http.post(url, user);
}

deleteSampleUser(userMasterId: number) {
  const url = `${this.endPointURL}${this.deleteSampleUsers}?id=${userMasterId}`;
  return this.http.delete(url);
}
}
