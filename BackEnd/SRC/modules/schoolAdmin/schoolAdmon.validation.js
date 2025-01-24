import Joi from 'joi';
import { generalFields } from '../../midlleware/validation.js';

//register vlidation
export const registerSchema ={
    body: Joi.object({
    userName:Joi.string().min(3).max(40).required().messages({
        'string.empty':'username is required'
    }),
    password:generalFields.password,
    cpassword:Joi.valid(Joi.ref('password')),
    email:generalFields.email,
    gender:Joi.valid('Male','Female'),
    //+972 ,+970 >> watsapp
    mobile: Joi.string()
    .pattern(/^\+?(970|972)[0-9]{9}$/) // Allow optional '+' and validate +970 or +972 format
    .required()  // Field is required
    .messages({
        'string.pattern.base': 'Invalid mobile number format. Please use (+970) or (+972) followed by 7 digits.',
        'any.required': 'Mobile number is required.'
    }),     idNumber: Joi.string().length(9).required(),
   //city
    country:Joi.string().min(2).required()
})
}

//log in validation

export const LoginSchema ={
  body:  Joi.object({
    email:generalFields.email,
    password:generalFields.password
})
}

export const updateSchema ={
    body: Joi.object({
    userName:Joi.string().min(3).max(40),
   
    //+972 ,+970 >> watsapp
    mobile: Joi.string()
    .pattern(/^\+?(970|972)[0-9]{9}$/) // Allow optional '+' and validate +970 or +972 format
      // Field is required
    .messages({
        'string.pattern.base': 'Invalid mobile number format. Please use (+970) or (+972) followed by 7 digits.'
       
    }),    
   //city
    country:Joi.string().min(2),
    //profilePicture:Joi.object()
})
}
