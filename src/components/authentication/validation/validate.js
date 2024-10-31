import * as yup from 'yup';

export const validationSchema= yup.object({
  userName:yup.string().required("user name is required").min(3,"userName must be at least 3 character").max(30,"max is 30"),
  email:yup.string().required("email is required").email() ,
  password:yup.string().required("password is required").min(3,"password must be at least 3 digits").max(30,"max is 30")
})
//Done
export const loginSchema= yup.object({
  email:yup.string().required("يجب ادخال البريد الاكتروني*").email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة").min(6).max(50) ,
  password:yup.string().required("يجب ادخال كلمة المرور*").min(8,"يجب ادخال 8 أحرف على الاقل")
})
export const sendCodeSchema= yup.object({
  email:yup.string().required("يجب ادخال البريد الاكتروني*").email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة") ,
 })

 export const forgetPasswordSchema= yup.object({
  email:yup.string().required("يجب ادخال البريد الاكتروني*").email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة") ,
  password:yup.string().required("يجب ادخال كلمة المرور*").min(3,"يجب ادخال 3 أحرف على الاقل").max(30,"يجب ادخال 30 حرف كحد أقصى"),
  confirmPassword: yup.string().oneOf([yup.ref('password'),null],'يجب ان تتوافق الكلمة مع الكلمة '),
  code:yup.string().required(" يجب ادخال الرمز*").length(4,"يجب أن يتكون الرمز من 4 أرقام") 
})
export const CreateorderSchema= yup.object({
  couponName:yup.string() ,
  address:yup.string().required("Your Address is required"),
  phone:yup.string().required("Your Phone is required") 
})

