import { APIRole, APIUser, RESTPatchAPICurrentUserJSONBody, URLFunction } from '@typings';
import { Client } from '@lib/index';

export default class Role {
    constructor(private client: Client, data: APIRole) {
        this.ID = data.id;
        this.name = data.name;
        this.color = data.color;
        this.icon = data.icon;
        this.emoji = data.unicode_emoji;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.isManaged = data.managed;
        this.isMentionable = data.managed;
    }

    ID: string;
    name: string;
    color: number;
    icon: string | null | undefined;
    iconURL(avatarURLFunction: URLFunction): string | null {
        return this.icon ? `https://cdn.discordapp.com/role-icons/${this.ID}/${this.icon}.${avatarURLFunction.format.toLowerCase()}` : null;
    }
    emoji: string | null | undefined;
    hoist: boolean;
    position: number;
    permissions: string;
    isManaged: boolean;
    isMentionable: boolean;
}