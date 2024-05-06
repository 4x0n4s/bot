import { CommandConstructorOptions, Events } from '@typings';

export function Command (command: CommandConstructorOptions) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        global.Main.commandsManager.registerCommands([
                { ...command, exec: descriptor.value.bind(target) as Function}
        ]);
    }
}

export function Event (name: keyof Events) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        global.Main.on(
            name, 
            async (...args) => {
                await descriptor.value.bind(...args)
            }
        );
    }
}
