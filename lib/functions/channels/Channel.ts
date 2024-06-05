import { APIChannel } from 'discord-api-types/v10';

export default class Channel {
    public readonly ID: Snowflake | null;
    public readonly name: string | null;
    public readonly type: number;

    constructor(data: APIChannel) {
        this.ID = data.id;
        this.name = data.name;
        this.type = data.type;
    }
}