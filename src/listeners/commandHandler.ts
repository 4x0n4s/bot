import type { Translations, Command, PermissionsData } from '@typings';
import { Message, MessageActivityType } from 'discord.js';
import { Event } from '@decorators';
import { defaultPrefix, defaultLang } from 'lib/Constants';
import * as fs from 'fs-extra';
import * as yml from 'yaml';

export default class {    
    @Event('messageCreate')
    async exec(message: Message) {
        const { author, guild, content, member } = message;
        const { bot } = author;
        if(bot || !guild || !content.startsWith(defaultPrefix)) return;
        
        let args = content.trim().slice(defaultPrefix.length).split(' ');
        const commandName = args[0].toLocaleLowerCase();

        let c: Command | undefined;
        if(commandName) c = Main.manager.findCommand(commandName, args);
        if(!c) return;

        let bypass: boolean = false;

        let query = databaseClient.query(`
            SELECT * FROM permissions WHERE guildID = ? AND commandIdentifier = ?;
        `).get(guild.id, c.name) as PermissionsData | null;

        if(!query) bypass = true;
        else {
            let { roleID, userID } = query;
            if(member?.roles.cache.has(roleID) ?? author.id === userID) bypass = true;
        }

        if(!bypass) return;

        args = args.slice(c.name.split(' ').length);
        const commandArgs = this.parseArguments(c, message, args);

        let lang = yml.parse(fs.readFileSync(`./langs/${defaultLang}.yml`, { encoding: 'utf-8' })) as Translations;
            
        function translate(t: string): string {
            lang[t] = lang[t]
                .replace('#guild', (_, key) => { return (message.guild as any)[key] || _ })
            return lang[t];
        }

        c.callback(message, commandArgs, translate);
    }

    parseArguments(c: Command, message: Message, args: string[]): Record<string, unknown> {
        const commandArgs: Record<string, unknown> = {};
        
        for (const arg of c.arguments) {
            let value: unknown;

            switch (arg.type) {
                case 'string':
                    value = args.filter(str => !str.includes('@') ?? !str.includes(',')).join(' ');
                    break;
                case 'number':
                    value = args.map(val => parseFloat(val)).find(val => !isNaN(val));
                    break;
                case 'boolean':
                    value = args.map(val => val === 'true' ? true : val === 'false' ? false : null).find(val => val !== null);
                    break;
                case 'user':
                    let clientUsers = Main.users.cache;
                    value = !arg.array ? message.mentions.users.first() ?? message.mentions.repliedUser ?? clientUsers.find(user => user.username.includes(args[0])) ?? clientUsers.get(args[0])
                        : [...new Set([...message.mentions.users.values(), ...args.map(ID => clientUsers.get(ID) || clientUsers.find(user => user.username.includes(ID))).filter(Boolean)])];
                    break;
                case 'channel':
                    let guildChannels = message.guild?.channels.cache;
                    value = !arg.array ? message.mentions.channels.first() ?? guildChannels?.find(channel => channel.name.includes(args[0])) ?? guildChannels?.get(args[0])
                        : [...new Set([...message.mentions.channels.values(), ...args.map(ID => guildChannels?.get(ID) || guildChannels?.find(channel => channel.name.includes(ID))).filter(Boolean)])];
                    break;
                case 'role':
                    let guildRoles = message.guild?.roles.cache;
                    value = !arg.array ? message.mentions.roles.first() ?? guildRoles?.find(role => role.name.includes(args[0])) ?? guildRoles?.get(args[0])
                        : [...new Set([...message.mentions.roles.values(), ...args.map(ID => guildRoles?.get(ID) || guildRoles?.find(role => role.name.includes(ID))).filter(Boolean)])];
                    break;
                case 'any':
                    value = args.join('').split(',');
                    break;
                default:
                    value = args.shift();
                    break;
            }
            args = args.slice(Array.isArray(value) ? value.length : 1);
            commandArgs[arg.id] = value;
        }
        return commandArgs;
    }
    
}