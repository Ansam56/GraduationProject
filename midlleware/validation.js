import Joi from "joi";

const dataMethods=['body','params','query']

export const generalFields ={
    email:Joi.string().email().min(6).max(50).required(),
    password:Joi.string().min(8).required().max(20)
    .pattern(new RegExp("[A-Z]"))          // At least one uppercase letter
    .pattern(new RegExp("[a-z]"))          // At least one lowercase letter
    .pattern(new RegExp("[0-9]"))          // At least one digit
    .pattern(new RegExp("[!@#$%^&*(),.?\":{}|<>]")) // At least one special character,
    .messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.base": "Password must contain uppercase, lowercase, a digit, and a special character."
    })

}
const validation =(schema)=>{
    const errorArray =[];
   return(req,res,next)=>{
  
    dataMethods.forEach(key=>{
        if(schema[key]){
            const validationResult =schema[key].validate(req[key],{abortEarly:false}); // abortEarly:false حتى يظهر جميع الايرورز 
            if(validationResult.error){
            errorArray.push(validationResult.error.details); //.details >> حتى احدد ايش يظهرلي من الايرور
            }
        }
    })
    if(errorArray.length>0){
        return res.status(400).json({message:"Validation Error",errorArray})
       }else{
        next();
       }
   }
   

}


export default validation;