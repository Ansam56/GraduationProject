import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.DBLINK);
        //console.log("connect")
    }catch(err){
        console.log("catch error",err)

    }
}
export default connectDb;