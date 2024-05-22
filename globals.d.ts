import type Bot from 'src/Bot';
import type DatabaseClient from 'src/Database';
import type Gateway from 'src/functions/WebSocket';

export {};

declare global {
    var Main: Bot;
    var databaseClient: DatabaseClient;
    var gateway: Gateway;
}