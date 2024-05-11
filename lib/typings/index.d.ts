export * from 'discord-api-types/v10';
import { ClientEvents } from 'discord.js';
import { Message } from 'lib/index';

export interface Events extends ClientEvents {
    connected: [];
    messageReceived: [message: Message]
}

export interface ClientSettings {
    token?: string,
    intents?: number,
    properties?: {
        OS: OSs
    }
}

export type KeyTypes = string | undefined | null;

export type OSs = 'Linux' | 'Discord IOS' | 'Discord Android';
export type ImageFormats = 'JPG' | 'PNG' | 'WEDP' | 'GIF';

export type Emoji = string;

export interface MessageReferenceOptions {
    channelID: string,
    messageID: string
}

export enum ChannelTypes {
       GuildText = 0,
       DM = 1,
       GuildVoice = 2,
       GroupDM = 3,
       GuildCategory = 4,
       GuildAnnouncement = 5,
       AnnouncementThread = 10,
       PublicThread = 11,
       PrivateThread = 12,
       GuildStageVoice = 13,
       GuildDirectory = 14,
       GuildForum = 15,
       GuildMedia = 16,
}

export interface StandardEmoji {
    ID: string,
    name: Emoji
}

export interface URLFunction {
    format?: ImageFormats
}

export type Languages = 'fr' | 'en';
export type Translations = {
    [key: string]: string
}

export interface BotOptions {
    token: string,
    dev: string,
}

export interface ManagerEvents {
    commandExecuted: [];
}

export type CollectorInteractions = ''
export interface CollectorEvents<I> {
	collect(collected: any): any;
	end(collected: T[], reason: V): any;
}



export type Command = CommandConstructorOptions & { 
    exec: Function
};

export interface CommandConstructorOptions {
    name: string,
    arguments: CommandArgumentsData[],
    description: [string, string][],
    list: ListsData,
    forceUpdate?: boolean
};
export interface CommandArgumentsData {
    id: string,
    type: CommandArgumentsTypesData,
    array?: boolean,
    required?: boolean
}
export type CommandArgumentsTypesData = typeof CommandArgumentsTypes 
    | 'any'
    | 'string'
    | 'boolean' 
    | 'number' 
    | 'member' 
    | 'user' 
    | 'role'
    | 'channel'

export enum CommandArgumentsTypes {
    String = 'string',
    Boolean = 'boolean',
    Number ='number',
    Member = 'member',
    User = 'user',
    Role = 'role',
    Channel = 'channel',
}

export interface Event {
    name: keyof Events,
    exec: Function 
}











export type ListsData = 
    | 'Test'
    | 'Moderation'
    | 'Utilities'
    | 'Information'
    | 'Logs'

export enum Lists {
    Test = 'test',
    Moderation = 'Moderation',
    Utilities = 'Utilities'
}

export interface BlackListData {
    userID: string,
    authorID: string,
    reason: string
}

export interface StarBoardsData {
    messageID: string,
    channelID: string,
    guildID: string,
    targetID: string
}

export interface StarBoardConfigData {
    logsID: string,
    guildID: string
}