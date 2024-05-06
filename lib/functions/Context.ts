import { Client, Message } from '@lib/index';
import { Endpoints } from '@lib/utilities/Constants';
import { request } from 'undici';

export default class Context {
    constructor (private client: Client, public message: Message) {

    }

    async send(content: string) {
        await request(Endpoints.API + `/channels/${this.message.channelID}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                content,
            }),
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
        });
    }
}