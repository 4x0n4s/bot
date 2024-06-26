export * from '@typings/jsdocs';
export * from '@typings/raw';
export * from '@typings/bot';

import { APIEmbed, APIActionRowComponent, APIMessageActionRowComponent } from 'discord-api-types/v10';
import { ClientEvents } from 'discord.js';
import type { Message, TextChannel, Guild } from 'lib/index';

export interface BasicCacheFunctions {
    async set(cacheName: string, key: string, value: string): void | Promise<void>;
    async get(cacheName: string, ...key: string[]): array | Promise<string | null>[];
    async clear(cacheName: string): void | Promise<void>;
    async delete(cacheName: string, ...keys: string[]): void | Promise<void>;
}

export interface CacheFunctions<V> {
    async set(key: string, value: string): void | Promise<void>;
    async get(...keys: string[]): array<V | null>;
    async clear(): void | Promise<void>;
    async delete(...keys: string[]): void | Promise<void>;
}

export type Caches = typeof string;

export interface ButtonCollectorOptions extends CollectorOptions {
    
}

export interface CollectorOptions {
    customsIDs: string | array<string>,
    usersIDs: string | array<string>
    autoUpdate?: boolean
}

export type KeyTypes = string | undefined | null;

export type OSs = 'Linux' | 'Discord IOS' | 'Discord Android';
export type ImageFormats = 'JPG' | 'PNG' | 'WEDP' | 'GIF';

export type Emoji = string;

export interface ClientSettings {
    token?: string,
    intents?: number,
    properties?: {
        OS: OSs
    }
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

export interface Events extends ClientEvents {
    connected: [];
    messageReceived: [message: Message];
    guildChannelCreate: [];

}
