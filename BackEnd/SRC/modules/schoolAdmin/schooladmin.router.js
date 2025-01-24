import { Route, Router } from "express";
import * as admistratorController from './schoolAdmin.controller.js'
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../midlleware/validation.js";
import { registerSchema, updateSchema } from './schoolAdmon.validation.js';
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
app.post('/createSchool/:id',fileUpload().fields([
  {name:'schoolInfo' ,maxCount:1},
  {name:'schoolPhoto',maxCount:1}
]),asyncHandler(schoolController.creteSchool));
//app.post('/createSchool/:id',fileUpload().single("schoolPhoto"),asyncHandler(schoolController.creteSchool))
app.post('/login',schoolAdmin,asyncHandler(admistratorController.logIn))
//app.get('/confirmEmail/:token',asyncHandler(admistratorController.confirmEmail))

///طلبات الانضمام
app.get('/allTeacherReq',schoolAdmin,asyncHandler(admistratorController.getAllTeacherReq))
app.get('/allTeacher',schoolAdmin,asyncHandler(admistratorController.getAllTeacher))
app.get('/allCircles',schoolAdmin,asyncHandler(admistratorController.getAllCircles))
app.get('/allCirclesReq',schoolAdmin,asyncHandler(admistratorController.getAllCirclesReq))
//schoolAdmin profile
app.get('/profile',auth,asyncHandler(admistratorController.getProfile))

app.put('/acceptTeacher/:teacherId',schoolAdmin,asyncHandler(admistratorController.acceptTeacher))
app.put('/rejectTeacher/:teacherId',schoolAdmin,asyncHandler(admistratorController.rejectTeacher))

app.put('/updateSchool',schoolAdmin,fileUpload().single('schoolPhoto'),asyncHandler(schoolController.updateSchool))
app.put('/updateProfile',schoolAdmin,fileUpload().single('profilePicture'),asyncHandler(admistratorController.updateProfile))

app.get('/getRrports',schoolAdmin,asyncHandler(schoolController.getReports))
//app.get('/allCircles:id',asyncHandler(schoolController.allCircles))




export default app;
