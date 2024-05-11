import { APIChannel, ChannelType, Emoji, MessageReferenceOptions, StandardEmoji } from '@typings';
import { Client, Message, Storage } from 'lib/index';
import { Endpoints } from 'lib/utilities/Constants'
import { request } from 'undici';

export default class Channel {
    constructor(private client: Client, data: APIChannel) {
        this.ID = data.id;
        this.type = data.type;

        this.client.channels.get(this.ID);
    }

    messages: Storage<string | undefined | null , Message> = new Storage();
    ID: string | null;
    type;
}