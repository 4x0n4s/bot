import { APIGuildMember } from '@typings';
import { Client } from '@lib/index';

export default class Member {
    constructor(private client: Client, data: any) {
        this.ID = data.id;
    }

    ID: string;    
}