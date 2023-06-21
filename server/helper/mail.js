import nodemailer from 'nodemailer'

export const sentOTP=(email, otp)=> {
    return new Promise((resolve, reject)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:"faafabin@gmail.com",
          pass: 'vfvehoilcnfrwkbx'
      }
  });
  var mailOptions = {
      from:"abhiramivv77@gmail.com",
      to: email,
      subject: "AutoSage Email verification",
      html: `
                <h1>Verify Your Email For AutoSage</h1>
                  <h3>use this code <h2>${otp}</h2> to verify your email</h3>
                 
               `
  };
  transporter.sendMail(mailOptions,(err,res)=>{
      if(err){
          console.log(err);
      }
      else {
  
      }
  });
    })
    
}