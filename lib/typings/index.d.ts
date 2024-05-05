export * from 'discord-api-types/v10';
import { ClientEvents } from 'discord.js';
import { Message } from '@lib/index';

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

export type OSs = 'Linux' | 'Discord IOS' | 'Discord Android';
export type ImageFormats = 'JPG' | 'PNG' | 'WEDP' | 'GIF';


export interface URLFunction {
    format: ImageFormat
}

export type Languages = 'fr' | 'en';
export type Translations = {
    [key: string]: string
}

export interface BotOptions {
    token: string,
    dev: string,
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