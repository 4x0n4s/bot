import type { Translations, Command } from '@typings';
import { Message } from 'discord.js';
import { Event } from '@decorators';
import { defaultPrefix, defaultLang } from 'lib/utilities/Constants';
import * as Converters from 'lib/utilities/Converters';
import * as fs from 'fs-extra';
import * as yml from 'yaml';

export default class {    
    @Event('messageCreate')
    async exec(message: Message) {
        const { author, guild, content } = message;
        const { bot } = author;
        if(bot || !guild || !content.startsWith(defaultPrefix)) return;
        
        let args = content.trim().slice(defaultPrefix.length).split(' ');
        const commandName = args[0].toLocaleLowerCase();

        if(commandName) {
            const c = Main.manager.findCommand(commandName, args) as Command;
            args = args.slice(c?.name.split(' ').length);
            const commandArgs = this.parseArguments(c, message, args);

            let lang = yml.parse(fs.readFileSync(`./langs/${defaultLang}.yml`, { encoding: 'utf-8' })) as Translations;  
            function translate(t: string): string {
                lang[t] = lang[t]
                    .replace('#guild', (_, key) => { return (message.guild as any)[key] || _ })
                return lang[t]
            }
            c?.callback(message, commandArgs, translate);
        }

    }

    bypass(): boolean {
        let bypass: boolean = false;
        return bypass
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
                case 'string':
                    commandArgs[arg.id] = args.splice(args.findLastIndex(str => str.includes(','))).join('');
                    break;
                    
            }
        });
        return commandArgs;
    }
}