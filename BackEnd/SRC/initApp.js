import { AppError } from '../appError.js';
import connectDb from './../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import messageRouter from './modules/message/message.router.js'
import postRouter from './modules/post/post.router.js'
import cors from'cors';
import adminRouter from './modules/auth/auth.router.js'
import schoolAdminRouter from './modules/schoolAdmin/schooladmin.router.js'
import teacherRouter from './modules/teacher/teacher.router.js'
import studentRouter from './modules/student/student.router.js'
import circleRouter from './modules/circle/circle.router.js'
import  axios from'axios';

//DBLINK='mongodb://127.0.0.1:27017/tuba'
//DBLINK='mongodb+srv://sahar123:sahar123@cluster0.bu41s.mongodb.net/tuba'

//DBLINK='mongodb+srv://sahar123:sahar123@cluster0.bu41s.mongodb.net/tuba'


const initApp=(app,express)=>{
    connectDb();
    app.use(cors())

    app.use(express.json());
    app.use('/auth',adminRouter);
    app.use('/schoolAdmin',schoolAdminRouter)
    app.use('/teacher',teacherRouter)
    app.use('/student',studentRouter)
   // app.use('/circle',circleRouter)
  //  app.use('/message',messageRouter)
   // app.use('/post',postRouter)
    app.use('*',(req,res,next)=>{
        return next(new AppError("page not found",400))
    });

    // global error handling >> اي مكان ممكن يحصل فيه خطا بيف الفنكشن وبمرر الخطا كنص في مسج
    app.use( (err,req,res,next) =>{
        return res.status(err.statusCode).json({message:err.message})
    });
    /*
    app.use( (suc,req,res,next) =>{
        return res.status(suc.statusCode).json({message:suc.message})
    });
    */
}

export default initApp;


