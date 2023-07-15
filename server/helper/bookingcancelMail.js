// // import nodemailer from 'nodemailer';
// // const sendCancellationEmail = async (email,bookingId) => {
// //     try {
// //       const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //             user:"faafabin@gmail.com",
// //             pass: 'vfvehoilcnfrwkbx',
// //         },
// //       });
  
// //       const mailOptions = {
// //         from: "faafabin@gmail.com",
// //         to: email,
// //         subject: 'Booking Cancellation',
// //         html: `
// //         <h1>Your booking with ID ${bookingId} has been cancelled</h1>
// //           <p>We regret to inform you that your booking has been cancelled.</p>
// //           <p>For further assistance, please contact our support team.</p>
// //         `,
// //       };
  
// //       await transporter.sendMail(mailOptions);
// //       console.log('Cancellation email sent');
// //     } catch (error) {
// //       console.log('Error sending cancellation email:', error);
// //     }
// //   };
// import nodemailer from 'nodemailer';

// const sentcancelMail = async (email, bookingId) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'faafabin@gmail.com',
//         pass: 'vfvehoilcnfrwkbx',
//       },
//     });

//     const mailOptions = {
//       from: 'faafabin@gmail.com',
//       to: email,
//       subject: 'Booking Cancellation',
//       html: `
//         <h1>Your booking with ID ${bookingId} has been cancelled</h1>
//         <p>We regret to inform you that your booking has been cancelled.</p>
//         <p>For further assistance, please contact our support team.</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Cancellation email sent');
//   } catch (error) {
//     console.log('Error sending cancellation email:', error);
//   }
// };

// export { sentcancelMail };
import nodemailer from 'nodemailer';

const sendCancelMail = async (email, bookingId, message) => {
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
      to: email,
      subject: 'Booking Cancellation',
      html: `
        <h1>Your booking with ID ${bookingId} has been cancelled</h1>
        <p>We regret to inform you that your booking has been cancelled.</p>
        <p>${message}</p>
        <p>For further assistance, please contact our support team 9876543218.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent');
  } catch (error) {
    console.log('Error sending cancellation email:', error);
  }
};

export { sendCancelMail };
