import { URLFunction } from '@typings';
import { APIRole } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';

export default class Role {
    public readonly ID: Snowflake;
    public readonly name: string;
    public readonly color: number;
    public readonly icon: string | null;
    public readonly emoji: string | null;
    public readonly hoist: boolean;
    public readonly  position: number;
    public readonly permissions: string;
    public readonly isManaged: boolean;
    public readonly isMentionable: boolean;

    constructor(public data: APIRole) {
        this.ID = data.id;
        this.name = data.name;
        this.color = data.color;
        this.icon = data.icon ?? null;
        this.emoji = data.unicode_emoji ?? null;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.isManaged = data.managed;
        this.isMentionable = data.managed;
    }

    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/role-icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
}