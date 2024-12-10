import { Router } from "express";


import { isSchoolAdmin } from "../../midlleware/schoolAdmin";
import * as schoolController from './school.controller'
import fileUpload from "../../utils/uploadFile";


//app.post('/createSchool',schoolAdmin,fileUpload().single('file'),asyncHandler(schoolController.creteSchool));
app.post('/createSchool',isSchoolAdmin,asyncHandler(schoolController.creteSchool));
