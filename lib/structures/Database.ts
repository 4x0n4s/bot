import SQLite from 'bun:sqlite';
import fs from 'fs-extra';

export default class DatabaseClient extends SQLite {
    constructor () {
        super(`datas.db`);
        this.exec(fs.readFileSync('querys.sql', 'utf-8'));
    }
}