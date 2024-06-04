import { CommandConstructorOptions, Events } from '@typings';
import { ClientEvents } from 'discord.js';

export function Command (command: CommandConstructorOptions) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        Main.manager.registerCommands([{ ...command, callback: descriptor.value.bind(target) as Function }]);
    }
}

export function Event (name: keyof Events) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        Main.manager.registerEvents([{ eventName: name, callback: descriptor.value.bind(target) as Function }]);
        Main.on(name as keyof ClientEvents, (...args) => void Main.manager.events.get(name)?.callback(...args));
    }
}
