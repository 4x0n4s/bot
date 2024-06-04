import { Client, Message } from 'lib/index'

const client = new Client({
    properties: {
        OS: 'Discord IOS'
    }
});

client.connect('MTIyMjk1NDYxNTQ3NDIyOTM0OQ.G1LJUO.1z1-w9xOt39Wv3TAK9KRK8K-fpRWhXBD2zn1VU');

client.on('connected', async () => {
    console.log(client.user.ID);
});

client.on('messageReceived', async (message: Message) => {
    if(message.creator?.isBot) return;
    await message.createReply({
        content: 'Test'
    });
    await message.addReactions(['🍡', '🎨']);
});