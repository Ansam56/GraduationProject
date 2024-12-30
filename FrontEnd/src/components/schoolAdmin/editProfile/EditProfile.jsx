  
// import { Avatar, Box, Divider, IconButton, Paper, Typography } from "@mui/material";
//  import p from "../../web/img/headerBg1.jpg"
// import style from "./EditProfile.module.css"
// import { Link } from "react-router-dom";
// import{ Button }from "@mui/material";


// export default function EditProfile() {
//   // const userName = "Shayma Ahmed"; // اسم المستخدم الكامل

//   // // استخدم أول حرفين من الاسم ليظهر كأحرف رمزية
//   // const initials = userName
//   //     .split(" ")
//   //     .map((name) => name[0])  // استخراج أول حرف من كل جزء من الاسم
//   //     .join("");               // جمع الأحرف لعرضها في الـAvatar

//     return (
//         <div className={`${style.profileContent}`}>
//              <Link to="/SchoolAdmin/ProfileSettings">الحساب الشخصي</Link>
//              <div>EditProfile</div>
//           <div className={`${style.profileImg}  d-flex flex-column align-items-center`}>
//           <Avatar 
//                 src={p} 
//                 alt="Profile Picture"
//                 sx={{
//                     width: 200,
//                     height: 200,
//                     objectFit: 'cover',  // يجعل الصورة تغطي الإطار بشكل متناسب
//                     objectPosition: 'center', // يضبط موضع الصورة بحيث تكون في المنتصف
//                     mb:2
//                 }} 
//             />
          
//           </div>
//           <Divider />

//          <form className="p-4" style={{ maxWidth: '600px', margin: '20px auto', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//             <fieldset  >
//                 <legend className="text-center" style={{ fontSize: '1.5rem', color: '#333' }}>تعديل المعلومات الشخصية</legend>
//                 <Divider />
//                 <div className="mt-3">
//                      {/* الاسم */}
//                 <div className="mb-3 row align-items-center">
//                     <label htmlFor="name" className="col-md-4 col-form-label text-end">الاسم</label>
//                     <div className="col-md-8">
//                         <input type="text" id="name" className="form-control" placeholder="Shayma Ahmed" />
//                     </div>
//                 </div>

//                 {/* رقم الجوال */}
//                 <div className="mb-3 row align-items-center">
//                     <label htmlFor="phone" className="col-md-4 col-form-label text-end">رقم الجوال</label>
//                     <div className="col-md-8">
//                         <input type="text" id="phone" className="form-control" placeholder="0598973345" />
//                     </div>
//                 </div>

//                 {/* المدينة */}
//                 <div className="mb-3 row align-items-center">
//                     <label htmlFor="city" className="col-md-4 col-form-label text-end">المدينة</label>
//                     <div className="col-md-8">
//                         <input type="text" id="city" className="form-control" placeholder="Salfeet" />
//                     </div>
//                 </div>

//                 {/* البريد الإلكتروني */}
//                 <div className="mb-3 row align-items-center">
//                     <label htmlFor="email" className="col-md-4 col-form-label text-end">البريد الإلكتروني</label>
//                     <div className="col-md-8">
//                         <input type="text" id="email" className="form-control" placeholder="shayma@gmail.com" />
//                     </div>
//                 </div>

//                 {/* كلمة السر */}
//                 <div className="mb-3 row align-items-center">
//                     <label htmlFor="password" className="col-md-4 col-form-label text-end">كلمة السر</label>
//                     <div className="col-md-8">
//                         <input type="text" id="password" className="form-control" placeholder="••••••••" />
//                     </div>
//                 </div>
//                   {/* زر التعديل */}
//             <div className="text-center">
//                 <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
//                     تعديل
//                 </Button>
//             </div>
//                 </div>
             
//             </fieldset>
//         </form>
        
//         </div>
//     );
// } 
