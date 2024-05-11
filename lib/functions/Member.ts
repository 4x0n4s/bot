import { APIGuildMember } from '@typings';
import { Client, Guild } from 'lib/index';

export default class Member {
    constructor(private client: Client, data: any, guild: Guild) {
        this.ID = data.id;
    }

    ID: string;    
}