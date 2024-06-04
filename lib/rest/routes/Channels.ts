import { CreateMessageOptionsData } from '@typings';
import { APIMessage } from 'discord-api-types/v10';
import { Endpoints } from '@lib/utilities/Constants';
import { Client, Message } from '@lib/index';
import RESTManager from '@lib/rest/RESTManager';
import { request } from "undici";

export class Channels {
    constructor(private client: Client, private restManager: RESTManager) {

    }

    async createMessage(message: Message, options: CreateMessageOptionsData) {
        let { ID, channelID, guildID } = message;
        await request(Endpoints.API + `/channels/${channelID}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                content: options.content,
                message_reference: {
                    message_id: options.messageReference.messageID,
                    channel_id: options.messageReference.channelID,
                    guild_id: options.messageReference.guildID
                }
            }),
            headers: this.restManager.headers
        });
    }
}