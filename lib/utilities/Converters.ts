import type { Guild, GuildMember, GuildBasedChannel, Message, Role, User, GuildChannel } from 'discord.js';
import type Bot from 'src/Bot';

let False = [''];
let True = [''];

export function parseUsers(message: Message) {
    const { client } = message;
    let clientUsers = client?.users.cache;
    if(!clientUsers) return [];

    let IDs = [...new Set([
        ...message.mentions.users.map(user => user),
        ...message.content.split(',').map(ID => clientUsers.get(ID) || clientUsers.find(user => user.username.includes(ID))).filter(Boolean),
        ...[message.mentions.repliedUser]
    ])];
    return IDs;
}

export function parseRoles(message: Message) {
    const { guild } = message;
    let guildRoles = guild?.roles.cache;
    if(!guildRoles) return [];

    let IDs = [...new Set([
        ...message.mentions.roles.map(role => role),
        ...message.content.split(',').map(ID => guildRoles.get(ID) || guildRoles.find(role => role.name.includes(ID))).filter(Boolean),
    ])];
    return IDs;
}

export function parseChannels(message: Message) {
    const { guild } = message;
    let guildChannels = guild?.channels.cache;
    if(!guildChannels) return [];
    
    let IDs = [...new Set([
        ...message.mentions.channels.map(role => role),
        ...message.content.split(',').map(ID => guildChannels.get(ID) || guildChannels.find(role => role.name.includes(ID))).filter(Boolean),
    ])];
    return IDs;
}

export function getBoolean(input: string) {
}

export function isBoolean(input: string) {
    return [...False, ...True].includes(input);
}