import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IUser } from "./login/user";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    //get the current user --welcome username
    //we need to whether the user has logged in or not
    //we have to log out the user
    url='/api/users';
    currentUser!:IUser |null;
    redirectToUrl!:string;
    users:IUser[]=[];
    foundIndex!:number;
    isValid:boolean=false;
    isLoggedIn:boolean=false;
    constructor(private http:HttpClient){}

    fetchAllUsers():Observable<IUser[]>{
      return this.http.get<IUser[]>(this.url).pipe(

        tap(data=>{
          //we are assigning data to this.users
          this.users=data;
          console.log(this.users)
    }),
        catchError(this.errorHandler)
    );

  }
  isLoggedInFunc():boolean{
    return !!this.currentUser;
}






         validateUser(user:any,users:IUser[]):boolean{

      console.log('validating theuser',user)
      user={...user};
      this.foundIndex=users.findIndex(u=>(u.userName==user.userName && u.password == user.password));
     
      console.log('found index ',this.foundIndex)
      if(this.foundIndex > -1){

        this.currentUser=this.users[this.foundIndex];
        console.log('found the user ',this.users[this.foundIndex])
        sessionStorage.setItem('loggedInUser',JSON.stringify(this.currentUser));
       this.isValid=true;
       this.isLoggedIn=true;
       sessionStorage.setItem('isLogged','true');

        return true;
      }
    return false;




    }

    logOut():void{
      sessionStorage.removeItem('loggedInUser');
        this.currentUser=null;
        this.isLoggedIn=false;
        sessionStorage.removeItem('isLogged');
    }
    isAdmin():boolean{
      console.log(this.currentUser)
        if(this.currentUser)
        return this.currentUser?.isAdmin;

        return true;
    }

    isUser():boolean{
      if(this.currentUser)
        return this.currentUser.isAdmin;
      return false;
    }




  //errorhandler which returns the Observable with errorMessage
  errorHandler=(err:any)=>{

    let errorMessage:string;
    //a client side error or network error then ErrorEvent object will be thrown

    if(err.error instanceof ErrorEvent)
      {

        errorMessage = `An error has occured ${err.error.message}`
      }
      else{

       errorMessage =  `Backend error code ${err.status} ${err.body.error}`;

      }
      console.log(err);
      return throwError(errorMessage);


   }

  }