import Errors from "./Errors";

export default class Logger { 
    constructor () {
        this.errors = new Errors(false);
    }
    errors: Errors;

    static initialize (subscriptionCode: string) {
        process.stdout.write(`\r[Base]: Logging - ${subscriptionCode}`);
    }
}