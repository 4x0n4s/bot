import { KeyTypes } from '@typings';
import { APIGuildMember } from 'discord-api-types/v10';
import { Role, Storage } from 'lib/index';

export default class Member {
    public readonly ID: Snowflake | null;    
    public readonly roles: Storage<KeyTypes, Role>;

    constructor(
        public data: APIGuildMember
    ) {
        this.ID = data.user?.id ?? null;
        this.roles = new Storage();
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(data: APIGuildMember) {
        return new Member(data);
    }
}