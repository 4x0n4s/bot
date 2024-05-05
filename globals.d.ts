import type { Bot } from '@lib/index';
import type DatabaseClient from 'src/Database';
import type Gateway from 'src/server/WebSocket';

export {};

declare global {
    var Main: Bot;
    var databaseClient: DatabaseClient;
    var gateway: Gateway;
}