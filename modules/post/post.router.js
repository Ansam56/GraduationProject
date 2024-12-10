import { Router } from "express";
const app =Router();
import * as postController from './post.controller.js'
import { auth } from "../../midlleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import fileUpload from "../../utils/multer.js";

app.get('/',asyncHandler(postController.getPost))
app.post('/',auth,fileUpload().single('image'),asyncHandler(postController.createPost));
app.patch('/like/:id',auth,asyncHandler(postController.likePost));
app.patch('/unlike/:id',auth,asyncHandler(postController.unlikePost));
//comment
app.post('/comment/:id',auth,fileUpload().single('image'),asyncHandler(postController.createComment));




export default app;