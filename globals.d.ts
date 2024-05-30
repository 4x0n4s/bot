import * as DiscordAPITypes from 'discord-api-types/v10';
import { SnowflakeUtil } from 'discord.js';
import Bot from 'src/Bot';
import DatabaseClient from 'src/Database';
import Gateway from 'src/functions/WebSocket';
import RedisClient from 'src/Redis';

export {};

declare global {
    var Main: Bot;
    var databaseClient: DatabaseClient;
    var redisClient: typeof RedisClient
    type array = string[];
    type Snowflake = DiscordAPITypes.Snowflake
}