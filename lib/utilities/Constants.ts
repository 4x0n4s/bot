

export enum Endpoints {
    API = 'https://discord.com/api/v10',
    GATEWAY = 'wss://gateway.discord.gg/?v=10&encoding=json',
    ATTACHEMENTS = 'https://cdn.discordapp.com'
}

export enum Intents {
    All = 3276799
};

export const defaultColor = 0x6200b9;
export const defaultFooter = 'Αξονας';
export const defaultLang = 'en';
export const defaultPrefix = '!';

export const UserRegex: RegExp = /^<@!?(\d+)>$/;
export const RoleRegex: RegExp = /^<@&(\d+)>$/;
export const ChannelRegex: RegExp = /^<#!?(\d+)>$/;