
import nodemailer from 'nodemailer';

const sendapprovalMail = async (useremail, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'faafabin@gmail.com',
        pass: 'vfvehoilcnfrwkbx',
      },
    });

    const mailOptions = {
      from: 'faafabin@gmail.com',
      to: useremail,
      subject: 'User Document verification',
      html: `
        <h1>Your Account with userID ${userId} has been Approved by the AutoRent Admin & Your Driving license and Adhar is Verified</h1>
        <p>We glad to inform you that your account has been Active.</p>
        
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Document verification email sent');
  } catch (error) {
    console.log('Error Sending Document verification email:', error);
  }
};

export { sendapprovalMail };
