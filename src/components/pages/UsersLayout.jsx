import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PersistentDrawerRight from './drawer/PersistentDrawerRight.jsx'
import InboxIcon from '@mui/icons-material/MoveToInbox';
  
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
             target:"/SchoolAdmin/ProfileSettings"
          },
          {
            name:"اعدادات الحساب",
            icon:<InboxIcon />,
            target:"/SchoolAdmin/ProfileSettings"
         },
         {
          name:"احصائيات المدرسة",
          icon:<InboxIcon />,
          target:"/SchoolAdmin/ProfileSettings"
          },
      
        ]
        NavTitle='ملتقى جامعة فلسطين التقنية_خضوري'    
        SideBarTitle="بوابة الإدارة"
  }else if(role==="teacher"){
    SideBarLinks=
      [ 
        {
          name:"اعدادات الحساب",
          icon:<InboxIcon />,
          target:"/Teacher/ProfileSettings"
       }  
      ] 
      NavTitle="ملتقى فلسطين التقنية خضوري > بالقرآن نحيا"
      SideBarTitle="بوابة المعلم"
  }

  return (
    <> 
    <PersistentDrawerRight component={ <Outlet/>} links={SideBarLinks} title={NavTitle} SideBarTitle={SideBarTitle}/>
    </> 
  )
}
