const dotenv = require('dotenv').config();


const email = {
    // Provider    
    nodemailer: {
        host: process.env.NODEMAILER_HOST || "smtp.ethereal.email",
        port: process.env.NODEMAILER_PORT || 587,
        secure: process.env.NODEMAILER_SECURE || false,
        auth: {
            user: process.env.NODEMAILER_FROM,
            pass: process.env.NODEMAILER_TO,
        },
        transporter: null
    }
}

export default email;
