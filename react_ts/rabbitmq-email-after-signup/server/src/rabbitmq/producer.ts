import { getChannel } from "./index";

export async function publishToQueue(queue: string, message: any) {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}