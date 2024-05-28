export class UserMaster{
    userMasterId:number=0;
    userName:string='';
    emailID:string='';
    password:string='';
    isSuperUser:boolean=false;
 }

 export class Login {
    emailId: string = '';
    password: string = '';
  }

  export class ApiResponse {
    status: boolean;
    statusCode: number;  // HttpStatusCode is an enum in C#, use number in TypeScript
    data: any;           // dynamic in C# maps to any in TypeScript
    errors: string[];
  }