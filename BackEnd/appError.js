// حتى اقدر اغير على status 

export class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}