import { CreateEmojiOptions} from '@typings';
import { APIEmoji, APIMessage } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
//import { ImageToB64 } from 'lib/utilities/b64';
import RESTManager from 'lib/rest/RESTManager';
import { Client, Emoji, Guild } from 'lib/index';
import { request } from 'undici';

export class Emojis {
    private _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    async get(
        guild: Guild, 
        emojiID: string
    ): Promise<APIEmoji | null>{
        let data = guild.emojis.get(emojiID)[0];
        if(!Boolean(data)) return await request(Endpoints.API + `/guilds/${guild.ID}/emojis/${emojiID}`, {
            method: 'GET',
            headers: this._client.rest.headers,
        }).then(async ({ 
            body, 
            statusCode 
        }) => {
            if(statusCode !== 200) return null;
            return await body.json() as APIEmoji;
        });
        return data ?? null;
    }

    async create(
        guild: Guild, 
        emojis: CreateEmojiOptions[], 
        reason?: string
    ): Promise<{ datas: Emoji[], length: number }> {
        let length = emojis.length;
        let datas: Emoji[] = [];
        for (const emoji of emojis) {
            //ImageToB64(emoji.url)
            let image = `data:image/png;base64,IMGBS64`;
            await request(Endpoints.API + `/guilds/${guild.ID}/emojis/`, {
                method: 'POST',
                headers: { 
                    ...this._client.rest.headers, 
                    'X-Audit-Log-Reason': reason 
                },
                body: JSON.stringify({
                    image,
                    name: emoji.name
                })
            }).then(
                async ({ body }) => {
                    let d = await body.json() as APIEmoji;
                    let emoji = new Emoji(d)
                    guild.emojis.set(emoji.ID as string, JSON.stringify(d));
                    datas.push(emoji);
                }, 
                () => length--
            );
        }
        return { datas, length };
    }

    async delete(
        guild: Guild, 
        emojisIDs: array<string>, 
        reason?: string
    ): Promise<number> {
        let length = emojisIDs.length;
        for (const emojiID of emojisIDs) {
            await request(Endpoints.API + `/guilds/${guild.ID}/emojis/${emojiID}`, {
                method: 'DELETE',
                headers: { 
                    ...this._client.rest.headers,
                    'X-Audit-Log-Reason': reason 
                },
            }).then(
                () => guild.emojis.delete(emojiID),
                () => {
                    length--;
                }
            );
            
        }
        return length;
    }
}