import { Route, Router } from "express";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../midlleware/validation.js";
import { auth,schoolAdmin } from "../../midlleware/auth.js";
import fileUpload from "../../utils/uploadFile.js";
import * as circleController from './circle.controller.js'
const app=Router({mergeParams:true});

app.post('/createCircle',fileUpload().single('logo'),asyncHandler(circleController.creatCircle))
app.get('/profile',auth,asyncHandler(circleController.getProfile))
app.put('/updateCircle',fileUpload().single('logo'),asyncHandler(circleController.updateCircle))

export default app;
