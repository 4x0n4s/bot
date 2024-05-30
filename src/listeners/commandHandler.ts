import type { Translations, Command, PermissionsData } from '@typings';
import { Message } from 'discord.js';
import { Event } from '@decorators';
import { defaultPrefix, defaultLang } from '@lib/utilities/Constants';
import * as Converters from '@lib/utilities/Converters';
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

    parseArguments(c: Command, message: Message, args: string[]) {
        const commandArgs: Record<string, unknown> = {};
        c.arguments.forEach(arg => {
            switch (arg.type) {
                case 'channel':
                    commandArgs[arg.id] = !arg.array ? Converters.parseChannels(message) : Converters.parseChannels(message)[0];
                    break;
                case 'role':
                    commandArgs[arg.id] = !arg.array ? Converters.parseRoles(message) : Converters.parseRoles(message)[0];
                    break;
                case 'user':
                    commandArgs[arg.id] = !arg.array ? Converters.parseUsers(message) : Converters.parseUsers(message)[0];
                    break;
                case 'any':
                    commandArgs[arg.id] = args.join('').split(',');
                    break;
                case 'any':
                    commandArgs[arg.id] = args.join('').split(',');
                    break;
                case 'string':
                    commandArgs[arg.id] = args.splice(args.findLastIndex(str => str.includes(','))).join('');
                    break;
                case 'notParsed':
                    commandArgs[arg.id] = args.splice(args.findLastIndex(str => str.includes(',')));
                    break;
            }
        });
        return commandArgs;
    }
}