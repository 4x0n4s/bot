import * as DiscordAPITypes from 'discord-api-types/v10';
import Bot from 'src/Bot';
import databaseClient from 'src/Database';
import Gateway from 'src/functions/WebSocket';
import redisClient from 'src/Redis';

export {};

declare global {
    var Main: Bot;
    var databaseClient: databaseClient;
    var redisClient: typeof redisClient
    type array = string[];
    type Snowflake = DiscordAPITypes.Snowflake
}