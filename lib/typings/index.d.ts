export * from '@typings/jsdocs';
export * from '@typings/raw';
import { APIEmbed, APIActionRowComponent, APIMessageActionRowComponent } from 'discord-api-types/v10';
import { ClientEvents } from 'discord.js';
import { Message, TextChannel, Guild } from '@lib/index';


export type KeyTypes = string | undefined | null;

export type OSs = 'Linux' | 'Discord IOS' | 'Discord Android';
export type ImageFormats = 'JPG' | 'PNG' | 'WEDP' | 'GIF';

export type Emoji = string;
export type Text = string;

export interface ClientSettings {
    token?: string,
    intents?: number,
    properties?: {
        OS: OSs
    }
}
export interface BotOptions {
    token: string,
    dev: string,
}



export interface MessageReference {
    messageID: string,
    channelID: string | null,
    guildID: string | null
}

export interface CreateMessageOptionsData {
    content: string,
    embeds?: APIEmbed | APIEmbed[];
    messageReference: MessageReference,
    rows?: ActionRow<MessageActionRowComponent>[]
}

export interface CreateMessageReplyOptionsData {
    content: string,
    embeds?: APIEmbed | APIEmbed[] = undefined;
    rows?: ActionRow<MessageActionRowComponent>[] = undefined;
}

export interface EditGuildOptions {
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;
    region: string;
    slash
}

export interface CreateEmojiOptions {
    name: string,
    url: string
}
 
export interface StandardEmoji {
    ID: string,
    name: Emoji
}

export interface Reason {
    reason?: string
}

export interface URLFunction {
    format?: ImageFormats
}

export type Languages = 'fr' | 'en';
export type Translations = {
    [key: string]: string
}


export type CollectorInteractions = '';
export interface CollectorSettings {
    time?: number | null;
    filter?: (interaction: any) => boolean,
    customID?: string
}
export interface CollectorEvents {
	collect(collected: any): any;
	end(collected, reason): any;
}

export interface ManagerEvents {
    commandExecuted: [];
}

export interface Events extends ClientEvents {
    connected: [];
    messageReceived: [message: Message];
    guildChannelCreate: [];

}







export type Command = CommandConstructorOptions & { 
    callback: Function
};

export interface Event {
    eventName: string,
    callback: Function
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
    | 'notParsed'

export enum CommandArgumentsTypes {
    String = 'string',
    Boolean = 'boolean',
    Number ='number',
    Member = 'member',
    User = 'user',
    Role = 'role',
    Channel = 'channel',
}

export type ListsData = 
    | 'Test'
    | 'Moderation'
    | 'Protection'
    | 'Utilities'
    | 'Information'
    | 'Logs'
    | 'Economy'

export enum Lists {
    Test = 'test',
    Moderation = 'Moderation',
    Utilities = 'Utilities'
}

export interface HelperData {
    ID: number,
    botID?: string,
    token?: string,
    helperName?: string
}

export interface HelperUpdateData {
    botID?: string,
    token?: string,
    helperName: string
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

export interface PermissionsData {
    userID: string,
    roleID: string,
    guildID: string,
    commandIdentifier: string,
    perm: number
}