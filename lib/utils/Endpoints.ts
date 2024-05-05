export const DiscordApiEndpoint = 'https://discord.com/api/v10';
export const DiscordGateway = 'wss://gateway.discord.gg/?v=10&encoding=json';

export const Servers = (ID?: string) => DiscordApiEndpoint + `/guilds/${ID}`;
export const ClientServers = (ID?: string) => DiscordApiEndpoint + `/users/@me` + `/guilds/${ID}`;
export const Channels = (ID?: string) => DiscordApiEndpoint + `/channels/${ID}`;
export const ServerMembers = (ID?: string) => Servers(ID) + `/members/${ID}`;