import { KeyTypes } from '@typings';
import { APIGuildMember, APIRole } from 'discord-api-types/v10';
import { Role, Storage } from 'lib/index';

export default class Member {
    public readonly ID: Snowflake | null;    
    
    constructor(
        public data: APIGuildMember
    ) {
        this.ID = data.user?.id ?? null;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }
 
}