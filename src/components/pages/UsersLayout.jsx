import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PersistentDrawerRight from './sharedDashboard/PersistentDrawerRight'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Logo from './logo/Logo';
  
export default function UsersLayout({role}) {
  let SideBarLinks=[]; 
  let NavTitle='';
  let SideBarTitle='';

  if(role==="schoolAdmin"){
    SideBarLinks=
      [
          {
             name:"عرض طلبات انضمام المعلمين",
             icon:<InboxIcon />,
             target:"/SchoolAdmin/TeachersRequests"
          },
          {
            name:"اعدادات الحساب",
            icon:<InboxIcon />,
            target:"/SchoolAdmin/ProfileSettings"
         },
         {
        name: "الأخبار",
        icon: <InboxIcon />,
        target: "/SchoolAdmin/posts",
         },
        //  {
        //   name:"احصائيات المدرسة",
        //   icon:<InboxIcon />,
        //   target:"/SchoolAdmin/ProfileSettings"
        //   },
      
        ]
        NavTitle='ملتقى جامعة فلسطين التقنية_خضوري'    
        SideBarTitle="بوابة الإدارة"
  }else if(role==="teacher"){
    SideBarLinks=
      [ 
        {
          name:"الرئيسية",
          icon:<InboxIcon />,
          target:"/Teacher"
        },
        {
          name:"اعدادات الحساب",
          icon:<InboxIcon />,
          target:"/Teacher/ProfileSettings"
       } ,
       {
        name:"عرض طلبات انضمام الطلاب",
        icon:<InboxIcon />,
        target:"/Teacher/StudentsRequests"
     } ,
     {
      name:"ادارة شؤون الطلاب",
      icon:<InboxIcon />,
      target:"/Teacher/StudentManagement"
   }  ,
   {
    name:"التقارير",
    subName:"تقرير الانجاز اليومي",
    icon:<InboxIcon />,
    target:"/Teacher/DailyAchievementReport"
   }
      ] 
      NavTitle="ملتقى فلسطين التقنية خضوري > بالقرآن نحيا"
      SideBarTitle="بوابة المعلم"
  }else if(role==="admin"){
    SideBarLinks=
      [ 
        {
          name:"ادارة الطلبات",
          icon:<InboxIcon />,
          target:"/Admin/SchoolRequests"
       }  
      ] 
      NavTitle="موقع طوبى"
      SideBarTitle=" بوابة المسؤولون"
  }

  return (
    <> 
    <PersistentDrawerRight component={ <Outlet/>} links={SideBarLinks} title={NavTitle} SideBarTitle={SideBarTitle}/>
    </> 
  )
}
