import { Emoji, StandardEmoji } from '@typings';
import { } from 'discord-api-types/v10';
import { Client, Message } from '@lib/index';
import RESTManager from '@lib/rest/RESTManager';
import { Endpoints } from '@lib/utilities/Constants';
import { request } from "undici";

export class Messages {
    constructor(private client: Client, private restManager: RESTManager) {

    }

    get() {

    }
    
    async addReactions(message: Message, emojis: Emoji[] | StandardEmoji[]) {
        let length = emojis.length;
        for (const emoji of emojis) {
            let req = await request(Endpoints.API + `/channels/${message.channelID}/messages/${message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'PUT',
                headers: this.restManager.headers
            }).catch(() => length--);
        }
        return length;
    }

    async removeReactions(message: Message, emojis: Emoji[] | StandardEmoji[]) {
        let length = emojis.length;
        for (const emoji of emojis) {
            await request(Endpoints.API + `/channels/${message.channelID}/messages/${message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'DELETE',
                headers: this.restManager.headers
            }).catch(() => length--);
        }
        return length;
    }
}