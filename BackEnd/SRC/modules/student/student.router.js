import { Route, Router } from "express";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../midlleware/validation.js";
import * as studentController from './student.controller.js'
import { registerSchema, updateSchema } from "./student.validation.js";
import studentModel from "../../../DB/models/student.js";
import fileUpload from "./../teacher/uploadFile.js"
import { auth, isStudent } from "../../midlleware/auth.js";



const app=Router();
//انشاء حساب
app.post('/register/:schoolId',validation(registerSchema),asyncHandler(studentController.register))
//انضمام للحلقة
app.post('/joinCircle/:circleId/:studentId',asyncHandler(studentController.joinCircle))
app.get('/profile',isStudent,asyncHandler(studentController.getProfile))
app.put('/updateProfile',isStudent,fileUpload().single('profilePicture'),asyncHandler(studentController.updateProfile))
//app.delete('/delete',isStudent,asyncHandler(studentController.deletePhoto))

app.get('/getReportByDate',isStudent,asyncHandler(studentController.getReport))
export default app;
