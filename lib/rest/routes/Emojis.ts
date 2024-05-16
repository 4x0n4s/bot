import { CreateEmojiOptions} from '@typings';
import { APIMessage } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import { ImageToB64 } from '#lib/utilities/b64';
import RESTManager from 'lib/rest/RESTManager';
import { Client, Guild } from 'lib/index';
import { request } from "undici";

export default class Emojis {
    constructor(private client: Client, private restManager: RESTManager) {

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
            }).catch(() => length--);
        }
        return length;
    }
}