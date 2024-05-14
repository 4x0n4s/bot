import SQLite from 'bun:sqlite';
import { readFileSync } from 'fs-extra';

export default class DatabaseClient extends SQLite {
    constructor () {
        super(`datas.db`);
        this.exec(readFileSync('querys.sql', 'utf-8'));
    }
}