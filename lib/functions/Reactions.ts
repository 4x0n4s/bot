import { Client, Message } from 'lib/index';
import { Emoji, StandardEmoji, MessageReferenceOptions } from 'lib/typings';
import { Endpoints } from 'lib/utilities/Constants';
import { request } from 'undici';

export default class Reactions {
    constructor (private client: Client, public message: Message) {
    }

    async reactions(emoji?: string) {
        return this.client.channels?.get(this.message.channelID as string)?.messages.get(this.message.ID)?.reactions
    }

    async addReactions(emojis: Emoji[] | StandardEmoji[]) {
        let length = emojis.length;
        for (const emoji of emojis) {
            await request(Endpoints.API + `/channels/${this.message.channelID}/messages/${this.message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bot ${this.client.token}`,
                    'Content-Type': 'application/json'
                }
            }).catch(() => length--);
        }
        return length;
    }

    async removeReactions(emojis: Emoji[] | StandardEmoji[]) {
        let length = emojis.length;
        for (const emoji of emojis) {
            await request(Endpoints.API + `/channels/${this.message.channelID}/messages/${this.message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bot ${this.client.token}`,
                    'Content-Type': 'application/json'
                }
            }).catch(() => length--);
        }
        return length;
    }
}