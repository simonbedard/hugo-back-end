import * as nodemailer from 'nodemailer';


type Email = {
    from: string;
    to: string;
    subject: string;
    text: string;
};

export default class mailer {
    options: any;
    testAccount: any;
    transporter: any;
    count: number;
    config: Object;
    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.testAccount = await nodemailer.createTestAccount();
        this.config = {
            host: process.env.NODEMAILER_HOST || this.testAccount.smtp.host,
            port: process.env.NODEMAILER_PORT || this.testAccount.smtp.port,
            secure: process.env.NODEMAILER_SECURE || this.testAccount.smtp.secure,
            auth: {
                user: process.env.NODEMAILER_FROM || this.testAccount.user,
                pass: process.env.NODEMAILER_TO || this.testAccount.pass
            },
        }
        this.transporter = await nodemailer.createTransport(this.config);
    }
    public async sendFromTemplate(template: String) {


        const email: Email = await this.getEmailTemplate(template);
        await this.send(email);

        return {
            template: template,
        }
    }

    /**
     * Send Email Notification
     */
    private send(email: Email) {
        this.transporter.sendMail(email, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        });

    }

    public getEmailTemplate(template: String) {
        return {
            from: '"Api test email👻" <api@crmapi.com>', // sender address
            to: "simon.bed12@gmail.com,", // list of receivers
            subject: "Api test simple email ✔", // Subject line
            text: "Hello world?", // plain text body
        }
    }
}


