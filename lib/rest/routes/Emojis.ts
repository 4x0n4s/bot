import { CreateEmojiOptions} from '@typings';
import { APIEmoji, APIMessage } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { ImageToB64 } from 'lib/utilities/b64';
import RESTManager from 'lib/rest/RESTManager';
import { Client, Emoji, Guild } from 'lib/index';
import { request } from "undici";

export class Emojis {
    constructor(private client: Client, private restManager: RESTManager) {

    }

    async get(guild: Guild, emojiID: Emoji['ID']) {
        if(!guild.emojis.has(emojiID)) await request(Endpoints.API + `/guilds/${guild.ID}/emojis/${emojiID}`, {
            method: 'GET',
            headers: this.restManager.headers,
        })
        else return guild.emojis.get(emojiID);
    }

    async create(guild: Guild, emojis: CreateEmojiOptions[], reason?: string) {
        let length = emojis.length;
    
        for (const emoji of emojis) {
            let image = `data:image/png;base64,${ImageToB64(emoji.url)}`;
            await request(Endpoints.API + `/guilds/${guild.ID}/emojis/`, {
                method: 'POST',
                headers: { ...this.restManager.headers, 'X-Audit-Log-Reason': reason },
                body: JSON.stringify({
                    image,
                    name: emoji.name
                })
            }).then(async ({ body }) => {
                let d = await body.json() as APIEmoji;
                let emoji = new Emoji(this.client, d)
                guild.emojis.set(emoji.ID, emoji);
            }).catch(() => length--);
        }
        return length;
    }

    async delete(guild: Guild, emojisIDs: Emoji['ID'][], reason?: string) {
        let length = emojisIDs.length;
        for (const emojiID of emojisIDs) {
            await request(Endpoints.API + `/guilds/${guild.ID}/emojis/${emojiID}`, {
                method: 'DELETE',
                headers: { 
                    ...this.restManager.headers,
                    'X-Audit-Log-Reason': reason 
                },
            }).catch(() => length--);
            guild.emojis.delete(emojiID);
        }
        return length;
    }
}