import { APIEmbed, APIMessageActionRowComponent, APIActionRowComponent} from 'discord-api-types/v10';
import { Command } from '@decorators';
import { createAudioPlayer, joinVoiceChannel, createAudioResource } from '@discordjs/voice';
import { RadiosURL, defaultColor, defaultPrefix } from '@lib/Constants';
import { ComponentType, Message } from 'discord.js';

export default class {
    /*
    [Protect/AntiRaid Commands]
    */

    @Command({
        name: 'radios',
        description: [['radios', 'List of radios']],
        arguments: [],
        list: 'Radios'
    })
    async radios_command(message: Message, args: {}, translate: (t: string) => string) { 
        const radios = Object.entries(RadiosURL);
        const urls = [''];
        let page = 0;

        function Embed(radioIndex: number) {
            const [title, url] = radios.find((_, i) => i === radioIndex) as [string, RadiosURL];
            return {
                author: { name: message.author.username, icon_url: message.author?.avatarURL() ?? undefined },
                color: defaultColor,
                title,
                description: `[Lien MP3](${url})`,
                timestamp: new Date().toISOString()
            } as APIEmbed;
        }
     
        const components: APIActionRowComponent<APIMessageActionRowComponent>[] = [{
            type: 1,
            components: [{
                type: 3,
                custom_id: 'radios',
                options: radios.map(([key]) => ({ label: key, value: key }))
            }],
        }];

        const m = await message.reply({ embeds: [Embed(page)], components });
        m.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
            filter: ({ user, customId }) => user.id === message.author.id && customId === 'radios'
        }).on('collect', interaction => {
            interaction.deferUpdate();
            m.edit({ embeds: [Embed(radios.findIndex(([key]) => key === interaction.values[0]))] });
        }).on('end', () => {
            m.edit({ components: [] });
        });
        /*const VoiceConnection = joinVoiceChannel({
            channelId: '1229149646644056074',
            guildId: '1223659401097773126',
            adapterCreator: message.guild?.voiceAdapterCreator as any
        });

        const mp3 = createAudioResource('https://start-latina.ice.infomaniak.ch/start-latina-high.mp3'); 
        const player = createAudioPlayer();
        VoiceConnection.subscribe(player);
        player.play(mp3);
        */
    }
}   