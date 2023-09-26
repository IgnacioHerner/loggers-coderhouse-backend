import nodemailer from 'nodemailer'
import mailgen from 'mailgen'
import logger from './logger.js'
import { GMAIL_CONFIG } from '../config/config.js'

export const deleteAccountMailer = async (email) => {
    const mailerConfig = {
        service: "gmail",
        auth: {user: GMAIL_CONFIG.user, pass: GMAIL_CONFIG.pass}
    }

    let transporter = nodemailer.createTransport(mailerConfig)

    const mailGenerator = new mailgen ({
        theme: "default",
        product: {
            name: "e-commerce Nba Store API",
            link: "http://localhost:8080/api/products",
        },
    })

    const response = {
        body: {
            name: email,
            intro: "Your account has been deleted",
            action: {
                instructions:
                    "Your account was deleted due to inactivity. To create a new account, click on the button",
                button: {
                    color: "#22BC66",
                    text: "Create new account",
                    link: "http://localhost:8080/api/session/register", // Railway
                },
            },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };

    const mail = mailGenerator.generate(response)

    let message = {
        from: GMAIL_CONFIG.user,
        to: email,
        subject: "e-commerce Nba Store API : Your acount has been deleted ",
        html: mail,
    }

    try {
        await transporter.sendMail(message)
        logger.info("Email sent successfully")
    } catch (err) {
        logger.error(`Error when sending email. ${err.stack}`)
    }
}