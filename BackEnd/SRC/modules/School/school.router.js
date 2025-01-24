import { Router } from "express";


import { isSchoolAdmin } from "../../midlleware/schoolAdmin.js";
import * as schoolController from './school.controller.js'
import fileUpload from "../../utils/uploadFile.js";
import { schoolAdmin } from "../../midlleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";


//app.post('/createSchool',schoolAdmin,fileUpload().single('file'),asyncHandler(schoolController.creteSchool));
//app.post('/createSchool',isSchoolAdmin,fileUpload().single('file'),asyncHandler(schoolController.creteSchool));
app.get('/profile',auth,asyncHandler(schoolController.getProfile))
app.put('/updateSchool',schoolAdmin,asyncHandler(schoolController.updateSchool))

