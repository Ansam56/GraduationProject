import { model, Schema } from "mongoose";
import mongoose from 'mongoose';

const adminSchema =new Schema({
    userName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    
    },confirmEmail:{
        type:Boolean,
        default:false,
    },password:{
        type:String,
        required:true 
    }
},{
    timestamps:true
})
const adminModel =mongoose.model('Admin',adminSchema)
export default adminModel;
