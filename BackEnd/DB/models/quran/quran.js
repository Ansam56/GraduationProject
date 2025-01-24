import { Types,model, Schema } from "mongoose";
import mongoose from 'mongoose';
const quranSchema =new Schema({
    surahName:{
        type:String
    },surahNum:{
        type:Number
    },/*surahChapter:{
        type:Number
    }*/verses_count:{
        type:Number
    },pages:{
        type:[Number]
    },verses:{
        type:[Number]
    }
}
,{
    timestamps:true
})
const quranModel =mongoose.model('quran',quranSchema)
export default quranModel;
