import { APIChannel } from 'discord-api-types/v10';
import Base from '@lib/functions/Base';

export default class BaseChannel extends Base {
    constructor(
        data: APIChannel
    ) {
        super();
        this.ID = data.id;
        this.name = data.name;
        this.type = data.type;
    }

    ID: Snowflake | null;
    name: string | null;
    type: number;
}