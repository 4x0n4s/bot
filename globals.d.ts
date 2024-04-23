import type { Bot, DatabaseClient } from '@lib/index';

export {};

declare global {
    var Main: Bot;
    var databaseClient: DatabaseClient;
}