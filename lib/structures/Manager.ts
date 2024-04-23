import type { Command, Event, Events} from '@typings';
import type Bot from '@lib/structures/Bot';
import * as fs from 'fs-extra';
import Emitter from 'events';
import Storage from '@lib/Storage';

export default class Manager extends Emitter {
    commands = new Storage<string, Command>;
    events = new Storage<keyof Events, Function>;
    constructor (private bot: Bot) {
        super();
        bot.on('messageCreate', async (message) => {
            
        })
    }
    
    getCommands() {
        return [...this.commands];
    }

    findCommand(commandName: string, args: string[]) {
        let command = this.commands.get(commandName);
        const commandArgs = args.join(' ');
        if(!command) command = this.commands.find(command => commandArgs.includes(command.name))?.[1];
        return command;
    }

    registerCommands(c: Command[]) {
        c.forEach(c => this.commands.set(c.name, c));
        return [...this.commands];   
    }

    registerEvents(e: Event[]) {
        e.forEach(e => {
            this.events.set(e.name, e.exec);
            this.bot.on(
                String(e.name), 
                async (...args) => {
                    await e.exec(...args)
                }
            );  
        });
        return [...this.events];
    }

    async load() {
        for (let dirName of ['./groups', './listeners']) {

            const dirs = fs.readdirSync('./src/' + dirName, { withFileTypes: true });
            for (const dir of dirs) {
                if(dir.isDirectory()) {
                    for (const file of fs.readdirSync(`./src/${dirName}/${dir.name}/`)) {
                        new (await import(`../../src/${dirName}/${dir.name}/${file}`)).default(this);
                    }  
                } else {
                    new (await import(`../../src/${dirName}/${dir.name}`)).default(this);
                }
            }
        }
    }
}