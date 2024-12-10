import { json } from "express";

class Success{
    constructor(message){
     return{message}
        }
     
    
}

export class AppSucc extends Success{
    
    
    constructor(message,statusCode){
        
        super(message);
        this.statusCode=statusCode;
    }
}
