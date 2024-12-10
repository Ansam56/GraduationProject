import Joi from 'joi';
import { generalFields } from '../../midlleware/validation.js';

//register vlidation
export const registerSchema ={
    body: Joi.object({
    userName:Joi.string().min(3).max(40).required().messages({
        'string.empty':'username is required'
    }),
    password:generalFields.password,
    email:generalFields.email,
    gender:Joi.valid('Male','Female'),
    //+972 ,+970 >> watsapp
    mobile: Joi.string().pattern(/^(059|056)[0-9]{7}$/).required(), // Palestinian phone number pattern
    idNumber: Joi.string().length(9).required(),
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