// import { Injectable } from "@angular/core";

// @Injectable({
//     providedIn: 'root'
// })
export class LoggingService{
    //only to showcase different type of loading services
    lastlog: string;

    printLog(message: string){
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message;
    }
}