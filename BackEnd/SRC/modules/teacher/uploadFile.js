// to can upload file>> image >> second way (save name and upload in db)
import multer  from'multer';
import { nanoid } from 'nanoid'
const fileUpload=()=>{
    const storage =multer.diskStorage({
      /*  destination:(req,res,cb)=>{
            cb(null,'uploads')
        },
        filename:(req,file,cb)=>{
         //  cb(null,Date.now()+"_"+file.originalname)  // Date.now() >> بخزنلي الصورة مع الوقت الي ارسلت فيه لحتى اذا صار تشابه في اسم الصورة المرفوعة التاريخ والوقت بميزهم
         // او باستخدام مكتبة nanoid بتشفرلي اسم الصورة 
         const uniqueSuffix=nanoid()+Date.now();   // we can add Math.random()
         cb(null,uniqueSuffix+"_"+file.originalname)
        }
         */
    });
     // file filter >> لحتى اخليه يقبل بس صور مش اي نوع ملفات ثانية
  /* function fileFilter(req,file,cb){
    if (file.fieldname === 'schoolPhoto') {
      // السماح بملفات الصور فقط
      if (file.mimetype.startsWith('image/')) {
        cb(null, true); // قبول الملف
      } else {
        const error = new Error('Invalid file type. Only images are allowed in schoolPhoto.');
        error.statusCode = 402; // كود HTTP صالح (Bad Request)
        cb(error,false)
      }}else{
        cb(null,true)
      }
    } */
       // if(req.files.fieldname === 'schoolPhoto'){  // امتداد الصور المسموح رفعه
      /*  if(['image/jpeg' ,'image/png' ,'image/gif','image/jpg'].includes(file.mimetype)){
      //or   if(file.mimetype=='image/jpeg' ||file.mimetype=='image/jpg'|| file.mimetype=='image/png' || file.mimetype=='image/gif'){
        cb(null,true)
        } else {
            const error = new Error('Invalid file type. Only images are allowed.');
            error.statusCode = 402; // كود HTTP صالح (Bad Request)
            cb(error, false); // رفض الملف
          }
  // }*/


// الترتيب مهم بالاول بفلتر بعدها ببعثه عالستوريح
const upload = multer({storage})
   // fileFilter: fileFilter,
   // limits: { fileSize: 2 * 1024 * 1024 } // حجم الملف الأقصى 2 ميجابايت
      // const upload=multer({soso:fileFilter,storage}); soso name of function insted fileFilter
        return upload;  
}
export default fileUpload;