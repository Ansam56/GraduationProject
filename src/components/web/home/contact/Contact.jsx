import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import style from './Contact.module.css'
export default function Contact() {
  return ( 
   <>
<div className={`${style.social_icons}`}>
  <a href="tel:+1234567890" title='0598973354'>
    <PhoneIcon sx={{ color: '#F1ECE1', fontSize: 24   }} />
  </a>
  <a href="https://wa.me/+972593928404" title='+972593928404' target="_blank" rel="noopener noreferrer">
    <WhatsAppIcon sx={{ color: '#F1ECE1', fontSize: 24  }} />
  </a>
  <a href="mailto:example@example.com" title='raghadmoqady@gmail.com'>
    <EmailIcon sx={{ color: '#F1ECE1', fontSize: 24  }} />
  </a>
</div>

   </>
  )
}
