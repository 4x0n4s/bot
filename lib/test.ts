import { Client, Message } from '@lib/index'

const client = new Client({});

client.connect('MTIyMjk1NDYxNTQ3NDIyOTM0OQ.GJTRMy.96-BGZVOuXtmWVV_6qmNPGvd2YMbWQRAo1IJuw');

client.on('connected', async () => {
    console.log(client.user.ID);
});

client.on('messageReceived', async (message: Message) => {
    if(!message.creator?.bot) {
        message.send('Test');
    }
    
})