
// import userModel from "../../../DB/models/Admin/user.model.js";
// import messageModel from "../../../DB/models/add/Message.model.js";
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// export const sendMessage =async (req,res)=>{
    
//     const {message}= req.body;
//     const{recivedId}= req.params;

//     const user = await userModel.findById(recivedId);
//     if(!user){    // بدي اتاكد اذا اليوزر موجود عندي 
//         return res.status(404).json({message:"User Not Found"});
//     }
    
//     await messageModel.create({message,recivedId});//اذا تمام بضيفه عجدول الرسائل

//   return res.status(201).json({message:"success"})


// }

// export const getMessages=async(req,res)=>{
   
//     const messages = await messageModel.find({recivedId:req.id})
//     return res.status(201).json({message:"success",messages})

// }