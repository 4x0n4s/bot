import DatabaseClient from "src/Database";
import Helpers from "src/functions/Helpers";
global.databaseClient = new DatabaseClient()
let d = new Helpers();
let all = Array.from(d.getHelpers());
d.setHelper('1', {
    ID: 1,
    helperName: 'e'
} as any);
console.log(all);
d.setHelper('2', {
    ID: 2,
    helperName: '55'
} as any);
console.log(all);