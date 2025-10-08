// import amqp from 'amqplib';
// import nodemailer from 'nodemailer';

// const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
// const QUEUE = "email_queue";

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'amrik.bhadra@gmail.com',
//         pass: 'dvwj reiu mbpc duky'
//     },
// });

// async function startWorker() {
//     const connection = await amqp.connect(RABBITMQ_URL);
//     const channel = await connection.createChannel();
//     await channel.assertQueue(QUEUE, { durable: true });

//     console.log('Email worker listening on queue:', QUEUE);

//     channel.consume(QUEUE, async (msg) => {
//         if (msg) {
//             const data = JSON.parse(msg.content.toString());
//             console.log("Processing email:", data);

//             try {
//                 await transporter.sendMail({
//                     from: 'amrik.bhadra@gmail.com',
//                     to: data.email,
//                     subject: "Welcome onboard",
//                     text: `Hi, ${data.name}, Welcome to our platform.`
//                 });

//                 console.log("Email sent to:", data.email);
//                 channel.ack(msg);
//             } catch (error) {
//                 console.error("Failed to send email:", error);
//             }
//         }
//     })
// }

// startWorker().catch(console.error);



import { initRabbitMQ } from "../rabbitmq";
import { consumeFromQueue } from "../rabbitmq/consumer";
import { QUEUES } from "../rabbitmq/queues";
import nodemailer from 'nodemailer';

async function startWorker() {
    await initRabbitMQ();

    await consumeFromQueue(QUEUES.EMAIL, async (data) => {
        console.log("Processing email:", data);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        if (data.template === "WELCOME_EMAIL") {
            await transporter.sendMail({
                from: '"RabbitMQ Test" <no-reply@guest.com>',
                to: data.email,
                subject: "Welcome to RabbitMQ testing!",
                text: `Hi ${data.name}, welcome aboard!`,
            });
        }

        if (data.template === "OTP") {
            await transporter.sendMail({
                from: '"RabbitMQ Test" <no-reply@guest.com>',
                to: data.email,
                subject: "Your OTP",
                text: `Hi ${data.name}, your OTP is ${data.otp}`,
            });
        }
    });
}

startWorker().catch(console.error);