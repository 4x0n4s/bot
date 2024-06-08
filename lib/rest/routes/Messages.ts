import { Emoji, StandardEmoji } from '@typings';
import { } from 'discord-api-types/v10';
import { Client, Message } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { Endpoints } from 'lib/Constants';
import { request } from "undici";

export class Messages {
    private _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    get() {

    }
    
    async addReactions(
        message: Message, 
        emojis: Emoji[] | StandardEmoji[]
    ): Promise<number> {
        let length = emojis.length;
        for (const emoji of emojis) {
            await request(Endpoints.API + `/channels/${message.channelID}/messages/${message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'PUT',
                headers: this._client.rest.headers
            }).catch(() => length--);
        }
        return length;
    }

    async removeReactions(
        message: Message, 
        emojis: Emoji[] | StandardEmoji[]
    ): Promise<number> {
        let length = emojis.length;
        for (const emoji of emojis) {
            await request(Endpoints.API + `/channels/${message.channelID}/messages/${message.ID}/reactions/${typeof emoji == 'object' ? `${emoji.name}:${emoji.ID}` : encodeURIComponent(emoji)}/@me`, {
                method: 'DELETE',
                headers: this._client.rest.headers
            }).catch(() => length--);
        }
        return length;
    }
}