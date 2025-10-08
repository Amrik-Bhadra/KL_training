import { getChannel } from "./index";

type MessageHandler = (msgContent: any) => Promise<void>;

export async function consumeFromQueue(queue: string, handler: MessageHandler) {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });

    console.log(`Consumer listening on queue: ${queue}`);

    channel.consume(queue, async (msg) => {
        if (msg) {
            try {
                const data = JSON.parse(msg.content.toString());
                await handler(data);
                channel.ack(msg);
            } catch (error) {
                console.error("Error processing message:", error);
            }
        }
    })
}