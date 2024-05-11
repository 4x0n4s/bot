import type { Guild, GuildMember, GuildBasedChannel, Message, Role, User, GuildChannel } from 'discord.js';
import type Bot from 'src/Bot';
import * as RegExps from 'lib/utilities/regexps';

let False = [''];
let True = [''];

export function parseUsers(message: Message, IDs: string[]) {
    const { client } = message;
    let clientUsers = client?.users.cache;
    if(!clientUsers) return [];

    return [...new Set([
        ...[...new Set(IDs)].map(ID => clientUsers.get(ID)).filter(Boolean),
        ...message.mentions.users.map(any => any),
        ...clientUsers.filter(any => IDs.includes(any.username)).map(any => any)
    ])] as User[];
}

export function parseRoles(message: Message, IDs: string[]) {
    const { guild } = message;
    let guildRoles = guild?.roles.cache;
    if(!guildRoles) return [];

    return [...new Set([
        ...IDs.map(ID => guildRoles.get(ID)) as Role[],
        ...message.mentions.roles.map(any => any),
        ...guildRoles.filter(any => IDs.includes(any.name)).map(any => any)
    ] as Role[])];
}

export function parseChannels(message: Message, IDs: string[]) {
    const { guild } = message;
    let guildChannels = guild?.channels.cache;
    if(!guildChannels) return [];
    
    return [...new Set([
        ...IDs.map(ID => guildChannels.get(ID)) as GuildChannel[],
        ...message.mentions.channels.map(any => any),
        ...guildChannels.filter(any => IDs.includes(any.name)).map(any => any)
    ] as GuildChannel[])];
}

export function getUsers(usersIDs: string[]) {
    return usersIDs.filter(userID => RegExps.UserRegex.exec(userID)?.[1]).map(userID => userID);
}

export function getRoles(rolesIDs: string[]) {
    return rolesIDs.filter(roleID => RegExps.RoleRegex.exec(roleID)?.[1])
}

export function getChannels(channelsIDs: string[]) {
    return channelsIDs.filter(channelID => RegExps.ChannelRegex.exec(channelID)?.[0]);
}

export function getBoolean(input: string) {
}

export function isBoolean(input: string) {
    return [...False, ...True].includes(input);
}