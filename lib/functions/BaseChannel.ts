import { } from '@typings';
import { APIChannel, APITextChannel } from 'discord-api-types/v10';
import { Client, Message, Storage } from 'lib/index';
import { Endpoints } from 'lib/utilities/Constants'
import { request } from 'undici';

export default class BaseChannel {
    constructor(data: APIChannel) {
        this.ID = data.id;
        this.name = data.name;
        this.type = data.type;
    }
    
    ID: string | null;
    name: string | null;
    type: number;
}