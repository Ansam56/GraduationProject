/*export const emailTemplet =(email,userName,token)=>{
    return`
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            margin: 20px 0;
            text-align: center;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px;
            color: #999999;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Welcome in Tuba Platform
        </div>
        <div class="content">
            <h1>Hello ${userName}</h1>
            <p>We are excited to have you on board. Thank you for registering with us.</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <a href='https://tuba-temp-1.onrender.com/auth/confirmEmail/${token}'>confirm email</a>
            </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
        </div>
    </div>
</body>
</html>
`
}*/



export const emailTemplet =(email,userName,token)=>{
    return`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f7f7f7;
    }

    .container {
      text-align: center;
      background: white;
      padding: 30px 50px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .title {
      font-size: 22px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }


    .btn {
      display: inline-block;
      background-color:rgb(237, 233, 228);
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s;
    }

    .btn:hover {
      background-color:rgb(0, 179, 48);
    }

    .illustration {
      margin-top: 20px;
    }

    .illustration img {
      max-width: 40%;
      height: auto;
    }
       .container1 {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(14, 30, 203, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 22px;
        }
        .content {
            margin: 20px 0;
            text-align: center;
        }
        .content h1 {
            color:rgb(6, 35, 197);
        }
        .content p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px;
            color: #999999;
            font-size: 14px;
        }
  </style>
</head>
<body>
 <div class="container1">
        <div class="header">
            Welcome in Tuba Platform
        </div>
        
        <div class="content">
         <div class="illustration">
     <img src="https://res.cloudinary.com/dff9dgomp/image/upload/v1737323773/verfication_xaysny.jpg">
   </div>
            <h1>Hello ${userName}</h1>
            <p>We are excited to have you on board. Thank you for registering with us.</p>
                <div class="title">Confirm Your Email</div>
                    <div class="subtitle">Please click the button below to confirm your email address:</div>
            <a href='https://tuba-temp-1.onrender.com/auth/confirmEmail/${token}' class="btn">confirm email</a>
            </div>
            <div class="container">
  
</div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
        </div>
    </div>
  
</body>
</html>
`
}



