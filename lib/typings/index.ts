import type { ClientEvents } from 'discord.js';

export type ClientConstructorOptions = {
    token: string,
    dev: string,
    slashCommands?: boolean
}

export type Command = CommandConstructorOptions & { 
    exec: Function
};
export type Event = {
    name: keyof Events,
    exec: Function 
}

export type CommandConstructorOptions = {
    name: string,
    arguments: CommandArgumentsData[],
    description: [string, string][],
    list: ListsData,
    forceUpdate?: boolean
};

export type CommandArgumentsData = {
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

export interface Events extends ClientEvents {
    test: [c: string]
}

export type BlackListData = {
    userID: string,
    authorID: string,
    reason: string
}

export type StarBoardsData = {
    messageID: string,
    channelID: string,
    guildID: string,
    targetID: string
}

export type StarBoardConfigData = {
    logsID: string,
    guildID: string
}
export type Languages = 'fr' | 'en';

export type Translations = {
    [key: string]: string
}