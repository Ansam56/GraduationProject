import { Router } from "express";
const app =Router();
import * as authController from './auth.controller.js'
import validation from "../../midlleware/validation.js";
import { LoginSchema, registerSchema } from "./auth.validation.js";
import { auth } from "../../midlleware/auth.js";
import { Admin } from "../../midlleware/Admin.js";
import { asyncHandler } from "../../utils/catchError.js";
import fileUpload from "../../utils/multer.js";

app.post('/register',Admin,authController.register);
//app.post('/login',asyncHandler(authController.login));
app.post('/login',asyncHandler(authController.loginUser));
app.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail))
//get all users
app.get('/allUsers',auth,asyncHandler(authController.getAllUsers));
//get all schoolsAdmins
app.get('/allSchoolsAdmins',auth,asyncHandler(authController.getAllSchoolsAdmins));
app.get('/allSchoolsReq',auth,asyncHandler(authController.getSchoolReq));
//updateStatus>>active
app.get('/updateStatus/:id',auth,asyncHandler(authController.updateStatus));
//updateStatus>>rejected
app.get('/rejectedReq/:id',auth,asyncHandler(authController.rejectedReq));



//app.post('/uploadImage',fileUpload().single('image'),authController.UploadImage)
app.put('/uploadImage',fileUpload().single('image'),auth,authController.UploadImage) //put>>can edit , just for user who log in so put auth


export default app;