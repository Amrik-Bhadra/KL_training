import * as amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";

let connection;
let channel: amqp.Channel;

export async function initRabbitMQ() {
    connection = await amqp.connect(RABBITMQ_URL);

    channel = await connection.createChannel();

    console.log("Connected to RabbitMQ and channel created.");
    return channel;
}

export function getChannel() {
    if (!channel) {
        throw new Error("RabbitMQ channel has not been initialized. Call initRabbitMQ() first.");
    }
    return channel;
}