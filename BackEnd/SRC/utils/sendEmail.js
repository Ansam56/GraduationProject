import nodemailer from "nodemailer";
import { emailTemplet } from "./emailTemplet.js"
import { sendCode } from "./sendCodeEmail.js";
import {sendActive} from "./senActiveUser.js"
import {sendReject} from './sendReject.js'

export async function sendEmail(to,subject,userName='',token){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAILSENDER,
          
          pass: process.env.PASSWORDSENDER,
        },
      });
      const info = await transporter.sendMail({
        from: `Tuba ${process.env.EMAILSENDER}`, // sender address
        to, // list of receivers
        subject, // Subject line
        html : emailTemplet(to,userName,token), // html body
      });
}
export async function sendCodeEmail(to,subject,userName='',code){
  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.PASSWORDSENDER,
      },
    });
    const info = await transporter.sendMail({
      from: `Tuba ${process.env.EMAILSENDER}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html : sendCode(to,userName,code), // html body
    });
}
export async function sendActiveEmail(to,subject,userName='',role){
  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.PASSWORDSENDER,
      },
    });
    const info = await transporter.sendMail({
      from: `Tuba ${process.env.EMAILSENDER}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html : sendActive(userName,role), // html body
    });
}
export async function sendRejectedEmail(to,subject,userName='',status){
  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.PASSWORDSENDER,
      },
    });
    const info = await transporter.sendMail({
      from: `Tuba ${process.env.EMAILSENDER}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html : sendReject(userName,status), // html body
    });
}
