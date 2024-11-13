import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import style from './Contact.module.css'
 import Zoom from '@mui/material/Zoom';
import { Tooltip } from '@mui/material';
export default function Contact() {

  const links=[
    {
      title:"0598973354",
      href:"tel:+1234567890",
      icon:<PhoneIcon sx={{ color: '#F1ECE1', fontSize: 24   }} />
    },
    {
      title:"+972593928404",
      href:"https://wa.me/+972593928404",
      icon:<WhatsAppIcon sx={{ color: '#F1ECE1', fontSize: 24  }} />
    },
    {
      title:"raghadmoqady@gmail.com",
      href:"mailto:example@example.com",
      icon: <EmailIcon sx={{ color: '#F1ECE1', fontSize: 24  }} />
    }
  ]
  return ( 
   <>
<div className={`${style.social_icons}`}>
  {links? links.map((link ,index)=>
    <Tooltip  key={index} TransitionComponent={Zoom} title={link.title}>
      <a href={link.href}{...(link.title === "+972593928404" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >{link.icon}</a>
    </Tooltip>
  ):''}
 
</div>

   </>
  )
}
