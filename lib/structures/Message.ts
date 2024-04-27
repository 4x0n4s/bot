

export default class Message {
    ID;
    content;
    
    constructor(data: any) {
        this.ID = data.ID;
        this.content = data.content;
    }
}