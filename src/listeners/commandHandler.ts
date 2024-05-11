import type { Translations, Command } from '@typings';
import { Message } from 'discord.js';
import { Event } from 'lib/utilities/decorators';
import { defaultPrefix, defaultLang } from 'lib/utilities/Constants';
import * as Converters from 'lib/utilities/Converters';
import * as fs from 'fs-extra';
import * as yml from 'yaml';

export default class {    
    @Event('messageCreate')
    async exec(message: Message) {
        const { author, guild, content } = message;
        const { bot } = author;
        if(bot || !guild || !content.startsWith('!')) return;
        
        let args = content.trim().slice(defaultPrefix.length).split(' ');
        const commandName = args[0].toLocaleLowerCase();
        if(commandName) {
            const c = global.Main.commandsManager.findCommand(commandName, args) as Command;
            args = args.slice(c?.name.split(' ').length);
            const commandArgs = this.parseArguments(c, message, args);

            function translate(t: string): string {
                let lang = yml.parse(fs.readFileSync(`./langs/${defaultLang}.yml`, { encoding: 'utf-8' })) as Translations;
                lang[t] = lang[t]
                    .replaceAll('#user', (_, key) => { return (message.author as any)[key] || _ })
                    .replaceAll('#guild', (_, key) => { return (message.guild as any)[key] || _ })
                return lang[t]
            }

            c?.exec(message, commandArgs, translate);
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
                    commandArgs[arg.id] = !arg.array ? Converters.parseChannels(message, args) : Converters.parseChannels(message, args)[0];
                case 'role':
                    commandArgs[arg.id] = !arg.array ? Converters.parseRoles(message, args) : Converters.parseRoles(message, args)[0];
                case 'user':
                    commandArgs[arg.id] = !arg.array ? Converters.parseUsers(message, args) : Converters.parseUsers(message, args)[0];
                case 'any':
                    commandArgs[arg.id] = !args;
            }
        });
        return commandArgs;
    }
}