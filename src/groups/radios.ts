import { createAudioPlayer, joinVoiceChannel, createAudioResource } from '@discordjs/voice';
import { Command } from '@decorators';
import { Message } from 'discord.js';

export default class {
    /*
    [Protect/AntiRaid Commands]
    */

    @Command({
        name: 'join',
        description: [['', '']],
        arguments: [],
        list: 'Test'
    })
    async radio_command(message: Message, args: {}, translate: (t: string) => string) { 
        const VoiceConnection = joinVoiceChannel({
            channelId: '1229149646644056074',
            guildId: '1223659401097773126',
            adapterCreator: message.guild?.voiceAdapterCreator as any
        });

        const mp3 = createAudioResource('https://hls-bfmbusiness.nextradiotv.com/no_ssai/128k/media.m3u8'); 
        const player = createAudioPlayer();
        VoiceConnection.subscribe(player);
        player.play(mp3);
    }
}   