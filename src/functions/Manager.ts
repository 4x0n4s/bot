import { Command, ManagerEvents, KeyTypes, Event } from '@typings';
import { Storage } from 'lib/index';
import Emitter from 'events';
import * as fs from 'fs-extra';

export default class Manager extends Emitter {
    commands = new Map<string, Command>();
    events = new Map<string, Event>();
    constructor () { 
        super();
    }

    on<Event extends keyof ManagerEvents>(
        event: Event,
        listener: (...args: ManagerEvents[Event]) => void,
    ): this {
        super.on(event, listener);
        return this;
    }
    
    getCommands() {
        return [...this.commands.values()];
    }

    findCommand(args: string[]) {
        const commandArgs = args.join(' ');
        let command = this.getCommands().sort((a, b) => b.name.length - a.name.length).find(command => commandArgs.includes(command.name));
        return command;
    }

    registerCommands(c: Command[]) {
        c.forEach(c => this.commands.set(c.name, c));
        return [...this.commands];   
    }

    registerEvents(c: Event[]) {
        c.forEach(c => this.events.set(c.eventName, c));
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