import SQLite from 'bun:sqlite';
import * as fs from 'fs-extra';

export default class DatabaseClient extends SQLite {
    constructor () {
        super(`datas.db`);
        this.exec('PRAGMA journal_mode = WAL;');
        this.exec(fs.readFileSync('querys.sql', 'utf-8')); 
    }

    ping() {
        let latency = performance.now();
        this.query('SELECT *;').all();
        latency -= performance.now();
        return latency.toFixed(2);
    }
}

