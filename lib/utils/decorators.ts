import { CommandConstructorOptions, Events } from '@typings';

export function Command (command: CommandConstructorOptions) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        global.Main.handlersManager.registerCommands([
                { ...command, exec: descriptor.value.bind(target) as Function}
        ]);
    }
}

export function Event (name: keyof Events) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
       global.Main.handlersManager.registerEvents([
            { name, exec: descriptor.value.bind(target) as Function }
        ])
    }
}
