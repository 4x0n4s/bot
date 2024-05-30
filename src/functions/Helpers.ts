import { HelperData, KeyTypes, HelperUpdateData } from '@typings';
import { Storage } from '@lib/index';
import HelperClient from './HelperClient';

export default class Helpers {
    private store = new Storage<string, HelperData>
    private instances = new Storage<KeyTypes, HelperClient>;
    static max = 5;
    datas: HelperData[];

    constructor() {
        this.datas = this.getAllHelpersWithDatabase();
        this.store.sets(this.datas.map(helper => [helper.ID.toString(), helper]));
    }

    getAllHelpersWithDatabase() {
        return databaseClient.query(`SELECT * FROM helpers;`).all() as HelperData[];
    }

    getHelperWithDatabase(key: string) {
        const query = databaseClient.query(`
            SELECT * FROM helpers WHERE helperName OR ID = ?;
        `);
        return query.get(key) as HelperData | null;
    }

    getHelper(key: string) {
        return this.store.get(key);
    };

    getHelpers() {
        return this.store.all()
    };

    setHelper(key: string, helper: HelperData) {
        const keys = Object.keys(helper).filter(key => key !== 'ID');
        const values = Object.entries(helper).filter(([key]) => key !== 'ID').map(data => data[1]);
        console.log(`INSERT INTO helpers (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')});`)
        const query = databaseClient.query(`
            ${this.store.has(key)
                ? `UPDATE helpers SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE ID = ?;`
                : `INSERT INTO helpers (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')});`}
        `);
        this.store.has(key) ? query.run(...values, key) : query.run(...values); 
        this.store.set(key, helper);
        return this;
    }

    delete(key: string) {
        let query = databaseClient.query(`
            DELETE FROM helpers WHERE helperName OR ID = ?
        `).get(key) as any;
        this.store.delete(key);
    }
}