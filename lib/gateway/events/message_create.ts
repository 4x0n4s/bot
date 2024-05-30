import { RawAPIMessage } from '@typings/raw'
import { Client, Message } from '@lib/index';
import { APIMessage } from 'discord-api-types/v10';

export default function (client: Client, d: RawAPIMessage) {
    let m = new Message(client, d);
    client.emit('messageReceived', m);
    client.channels.get(m.channelID)?.messages.set(m.ID, m);
    client.guilds.get(m.guildID)?.channels.get(m.channelID)?.messages.set(m.ID, m);
}