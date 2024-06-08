export interface BotOptions {
    token: string,
    dev: string,
}


export type Languages = 'fr' | 'en';
export type Translations = {
    [key: string]: string
}

export interface ManagerEvents {
    commandExecuted: [];
}

export interface Event {
    eventName: string,
    callback: Function
};

export type Command = CommandConstructorOptions & { 
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
    Channel = 'channel'
}

export type ListsData = 
    | 'Moderation'
    | 'Protection'
    | 'Utilities'
    | 'Information'
    | 'Permissions'
    | 'Radios'
    | 'Logs'
    | 'Economy'

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

export interface PermissionsData {
    userID: string,
    roleID: string,
    guildID: string,
    commandIdentifier: string,
    perm: number
}