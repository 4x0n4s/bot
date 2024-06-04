import { CreateMessageOptionsData } from '@typings';
import { Endpoints } from 'lib/Constants';
import { Client, Message } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { request } from "undici";

export class Channels {
    constructor(
        private restManager: RESTManager
    ) {}

    async createMessage(message: Message, options: CreateMessageOptionsData) {
        let { channelID } = message;
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