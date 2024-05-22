import { HelperData, KeyTypes, HelperUpdateData } from '@typings';
import Storage from 'lib/utilities/Storage';
import HelperClient from './HelperClient';

export default class Helpers {
    private store = new Storage<string, HelperData>
    private instances = new Storage<KeyTypes, HelperClient>;
    static max = 5;
    datas: HelperData[];

    constructor() {
        this.datas = databaseClient.query(`SELECT * FROM helpers;`).all() as HelperData[];
        this.store.sets(this.datas.map(helper => [helper.ID.toString(), helper]));
    }

    getWithDatabase(key: string) {
        const query = databaseClient.query(`
            SELECT * FROM helpers WHERE helperName OR ID = ?;
        `);
        return query.get(key) as HelperData | null;
    }

    getHelper(key: string) {
        return this.store.get(key);
    };

    setHelper(key: string, helper: HelperUpdateData) {
        const keys = Object.keys(helper);
        const values = Object.values(helper);
        const query = databaseClient.query(`
            ${this.store.has(key)
                ? `UPDATE helpers SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE ID = ?`
                : `INSERT INTO helpers (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`}
        `);
        query.run(...values, key);
        this.store.set(key, helper as HelperData);
        return this;
    }

    delete(key: string) {
        let query = databaseClient.query(`
            DELETE FROM helpers WHERE helperName OR ID = ?;
            RETURNING *;
        `).get(key) as any;
        this.store.delete(query.ID);

        return query ? true : false;
    }
}