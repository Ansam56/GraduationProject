import { Router } from "express";
const app =Router();
import * as authController from './auth.controller.js'
import validation from "../../midlleware/validation.js";
import { forgetPassSchema, LoginSchema, registerSchema } from "./auth.validation.js";
import { auth } from "../../midlleware/auth.js";
import { Admin } from "../../midlleware/Admin.js";
import { asyncHandler } from "../../utils/catchError.js";
import fileUpload from "../../utils/multer.js";

app.post('/register',Admin,authController.register);
//app.post('/login',asyncHandler(authController.login));
app.post('/login',validation(LoginSchema),asyncHandler(authController.login));
app.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail))
//forget password
//app.put('/forgetPassword',validation(forgetPassSchema),asyncHandler(authController.forgetPass))
app.put('/forgetPassword',validation(forgetPassSchema),asyncHandler(authController.forgetPass))
//sendcode
app.put('/sendCode',asyncHandler(authController.sendCode))

//get all users
app.get('/allUsers',auth,asyncHandler(authController.getAllUsers));
//get all schoolsAdmins
app.get('/allSchoolsAdmins',auth,asyncHandler(authController.getAllSchoolsAdmins));
app.get('/allSchoolsAdminReq',auth,asyncHandler(authController.getAllSchoolAdminReq));
//get all schools
app.get('/allSchools',auth,asyncHandler(authController.getAllSchools))
app.get('/allSchoolsReq',auth,asyncHandler(authController.getAllSchoolsReq))
app.get('/homePageSchool',asyncHandler(authController.getAllSchoolHomePage))
app.get('/allStatistics',asyncHandler(authController.getStatistics))
app.get('/allCircles/:id',asyncHandler(authController.allCircles))

//all teacher
app.get('/allTeacher',auth,asyncHandler(authController.getAllTeacher))
app.get('/allTeacherReq',auth,asyncHandler(authController.getAllTeacherReq))
//get all circles
app.get('/allCircles',auth,asyncHandler(authController.getAllCircles))
app.get('/allCirclesReq',auth,asyncHandler(authController.getAllCirclesReq))
//all student
app.get('/allStudent',auth,asyncHandler(authController.getAllStudent))
app.get('/allStudentReq',auth,asyncHandler(authController.getAllStudentReq))
app.get('/allStudentUser',auth,asyncHandler(authController.getAllStudentUser))

//updateStatus>>active
app.put('/updateStatus/:id',auth,asyncHandler(authController.updateStatus));
//updateStatus>>rejected
app.put('/rejectedReq/:id',auth,asyncHandler(authController.rejectedReq));
//user profile
app.get('/profile',auth,asyncHandler(authController.getProfile))

//app.post('/uploadImage',fileUpload().single('image'),authController.UploadImage)
app.put('/uploadImage',fileUpload().single('image'),auth,authController.UploadImage) //put>>can edit , just for user who log in so put auth
app.delete('/delete',auth,asyncHandler(authController.deletePhoto))


app.get('/getSurah/:chapterNum',asyncHandler(authController.getSuraData))
app.get('/data',asyncHandler(authController.getSurah))
app.get('/page',asyncHandler(authController.getPageAyah))

export default app;