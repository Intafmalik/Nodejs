const nodemailer = require('nodemailer');

const sendEmail = async (option)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS,
  
        }
    })

    const mailOption = {
        from:'"Forgot password OTP verification, " <079BCT029@ioepc.edu.np>',
        to:option.email,
        subject:option.subject,
        text:"Your OTP is "+ option.OTP
    }
    try {
        const info = await transporter.sendMail(mailOption);
        console.log("Email sent:", info);
        
    } catch (error) {
        console.log("Error in sending email: ",error)        
    }

}

module.exports = sendEmail


