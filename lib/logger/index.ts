export default class Logger {
    log = (text: any) => process.stdout.write(String(text) + '\n');
    
}