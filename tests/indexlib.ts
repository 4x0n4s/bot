import { Client, Message } from 'lib/index'

const client = new Client({});

client.connect('MTIyMjk1NDYxNTQ3NDIyOTM0OQ.G1LJUO.1z1-w9xOt39Wv3TAK9KRK8K-fpRWhXBD2zn1VU');

client.on('connected', async () => {
    console.log(client.user.ID);
});

client.on('messageReceived', async (message: Message) => {
    if(!message.creator?.bot) {
        message.send('Test');
    }
    
    message.reactions.all();
});