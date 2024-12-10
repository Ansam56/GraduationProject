import { Route, Router } from "express";
import * as admistratorController from './schoolAdmin.controller.js'
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../midlleware/validation.js";
import { registerSchema } from './schoolAdmon.validation.js';
import { auth,schoolAdmin } from "../../midlleware/auth.js";
import * as schoolController from './../School/school.controller.js'
import { isSchoolAdmin } from "../../midlleware/schoolAdmin.js";
import fileUpload from "../../utils/uploadFile.js";



const app=Router();
//انشاء حساب
app.post('/register',validation(registerSchema),asyncHandler(admistratorController.register))
/*app.post('/createSchool/:id',fileUpload().fields([
    { name: 'schoolInfo', maxCount: 1 },
    { name: 'schoolPhoto', maxCount: 1 },
  ]),asyncHandler(schoolController.creteSchool));
*/
app.post('/createSchool/:id',fileUpload().single('schoolInfo'),asyncHandler(schoolController.creteSchool));
app.post('/login',schoolAdmin,asyncHandler(admistratorController.logIn))


//طلبات الانضمام
app.post('/requests',schoolAdmin,admistratorController.viewRequests)

export default app;