import { APIEmbed, APIMessageActionRowComponent, APIActionRowComponent} from 'discord-api-types/v10';
import { Command } from '@decorators';
import { defaultColor, defaultPrefix } from 'lib/Constants';
import { Message, User, ComponentType } from 'discord.js';

export default class {
    /*
    [Infos Commands]
    */

    @Command({
        name: 'help', 
        arguments: [{ id: 'commandName', type: 'string' }], 
        description: [['help', 'Show a list of commands'], ['help <commandName>', 'Show informations about a command ']],
        list: 'Information'
    })
    async help_command(message: Message, args: { commandName: string }) {
        let { commandName } = args;
        
        let embed: APIEmbed = {
            author: { name: message.author.username, icon_url: message.author?.avatarURL() ?? undefined },
            color: defaultColor     
        };
        
        if (commandName) {
            let command = Main.manager.commands.get(commandName);
            if(command) {
                message.reply({ embeds: [{
                    ...embed,
                    title: command.name,
                    fields: command.description.map(([key, value]) => ({ name: `\`\`${defaultPrefix + key}\`\``, value: value })),
                    footer: { text: `${command.name} - ${command.list}` },
                    timestamp: new Date().toISOString()
                }] });
                return;
            }
        }

        let page = 0;
        const lists = ['Moderation', 'Protection', 'Utilities', 'Information', 'Permissions', 'Radios', 'Logs', 'Economy'];
        const commands = Main.manager.getCommands();
    
        function Embed(list: string) {
            return {
                ...embed,
                title: list,
                fields: commands
                    ?.filter(command => command.list === list)
                    .map(command => command.description)
                    .flatMap(descriptions => descriptions)
                    .map(description => ({ name: `\`\`${defaultPrefix + description[0]}\`\``, value: description[1] })),
                footer: { text: `${list} - ${commands?.length}` },
                timestamp: new Date().toISOString()
            } as APIEmbed;
        }
     
        const components: APIActionRowComponent<APIMessageActionRowComponent>[] = [{
            type: 1,
            components: [{
                type: 3,
                custom_id: 'help',
                options: lists.map(list => ({ label: list, value: list }))
            }],
        }];

        const m = await message.reply({ embeds: [Embed(lists[page])], components });
        m.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
            filter: ({ user, customId }) => user.id === message.author.id && customId === 'help'
        }).on('collect', (interaction) => {
            interaction.deferUpdate();
            m.edit({ embeds: [Embed(lists.find(list => list === interaction.values[0]) ?? 'Moderation')] });
        }).on('end', () => {
            m.edit({ components: [] });
        });
    }

    @Command({
        name: 'banner',
        arguments: [{ id: 'user', type: 'user' }],
        description: [['banner <user>', 'pic']],
        list: 'Information',
    })
    async banner_command(message: Message, args: { user: User }) {
        let { user } = args;

        if(!user) {
            await Main.users.fetch(message.content
                    .trim()
                    .split(' ')[1])
                .then(u => user = u)
                .catch(() => user = message.author);
        }

        if(!user.banner) {
            return;
        }

        let embed: APIEmbed = {
            title: `${user.globalName} banner's`,
            image: { 
                url: user.bannerURL({ extension: 'png' }) as string
            },
            color: defaultColor,
            timestamp: new Date().toISOString()
        }

        message.reply({
            embeds: [embed]
        });
    }

    @Command({
        name: 'pic',
        arguments: [{ id: 'user', type: 'user' }],
        description: [['pic <user>', 'pic']],
        list: 'Information',
    })
    async pic_command(message: Message, args: { user: User }) {
        let { user } = args;

        if(!user) {
            await Main.users.fetch(message.content
                    .trim()
                    .split(' ')[1])
                .then(u => user = u)
                .catch(() => user = message.author);
        }

        let embeds: APIEmbed[] = [{
            title: `${user.globalName} avatar's`,
            image: { 
                url: user.avatarURL({ extension: 'png' }) as string
            },
            color: defaultColor,
            timestamp: new Date().toISOString()
        }];

        message.reply({ embeds });
    }
}   