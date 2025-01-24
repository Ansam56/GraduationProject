import { Route, Router } from "express";
import * as teacherController from './teacher.controller.js'
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../midlleware/validation.js";
import { registerSchema,updateSchema } from './teacher.validation.js';
import { auth,schoolAdmin,isTeacher } from "../../midlleware/auth.js";
import fileUpload from "./uploadFile.js";
import circleRouter from './../circle/circle.router.js'
import * as circleController from './../circle/circle.controller.js'



const app=Router();
//انشاء حساب
app.post('/register/:schoolId',fileUpload().single('teacherInfo'),validation(registerSchema),asyncHandler(teacherController.register))
/*app.post('/createSchool/:id',fileUpload().fields([
    { name: 'schoolInfo', maxCount: 1 },
    { name: 'schoolPhoto', maxCount: 1 },
  ]),asyncHandler(schoolController.creteSchool));
*
app.post('/createSchool/:id',fileUpload().fields([
  {name:'schoolInfo' ,maxCount:1},
  {name:'schoolPhoto',maxCount:1}
]),asyncHandler(schoolController.creteSchool));
//app.post('/createSchool/:id',fileUpload().single("schoolPhoto"),asyncHandler(schoolController.creteSchool))
app.post('/login',schoolAdmin,asyncHandler(admistratorController.logIn))
//app.get('/confirmEmail/:token',asyncHandler(admistratorController.confirmEmail))

//طلبات الانضمام
app.post('/requests',schoolAdmin,admistratorController.viewRequests)
*/

//create circle 
app.use('/:teacherId/circle',circleRouter)
app.put('/acceptStudent/:studentId',isTeacher,asyncHandler(teacherController.acceptStudent));
app.put('/rejectStudent/:studentId',isTeacher,asyncHandler(teacherController.rejectStudent));
app.get('/profile',isTeacher,asyncHandler(teacherController.getProfile))
app.put('/updateProfile',isTeacher,fileUpload().single('profilePicture'),asyncHandler(teacherController.updateProfile))

app.get('/allStudent',isTeacher,asyncHandler(teacherController.getAllStudent))
app.get('/allStudentReq',isTeacher,asyncHandler(teacherController.getAllStudentReq))
app.get('/allStudentUser',isTeacher,asyncHandler(teacherController.getAllStudentUser))

app.post('/studentReport/:studentId',isTeacher,asyncHandler(teacherController.createRepotrs))
app.get('/studentsManagement',isTeacher,asyncHandler(teacherController.manageStudents))
app.get('/circleReportsByDate',isTeacher,asyncHandler(teacherController.getReportsByDate))
app.delete('/deleteReport/:reportId',isTeacher,asyncHandler(teacherController.deleteReport))
app.put('/editReport/:reportId',isTeacher,asyncHandler(teacherController.editReport))

//app.post('/createCircle/:id',fileUpload().single('logo'),asyncHandler(circleController.creatCircle))
export default app;