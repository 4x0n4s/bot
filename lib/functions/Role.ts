import { URLFunction } from '@typings';
import { APIRole } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { Client } from 'lib/index';

export default class Role extends Base {
    constructor(private client: Client, data: APIRole) {
        super();
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

    ID: string;
    name: string;
    color: number;
    icon: string | null;
    iconURL({ format  = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/role-icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    emoji: string | null;
    hoist: boolean;
    position: number;
    permissions: string;
    isManaged: boolean;
    isMentionable: boolean;
}