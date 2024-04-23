CREATE TABLE 
IF NOT EXISTS 
sanctions (
    ID INTEGER PRIMARY KEY,
    sanction TEXT,
    memberID TEXT, 
    authorID TEXT,
    guildID TEXT,
    reason TEXT,
    date NUMBER
);
            
CREATE TABLE 
IF NOT EXISTS 
starboard (
    logsID TEXT,
    guildID TEXT
);

CREATE TABLE 
IF NOT EXISTS 
starboards (
    guildID TEXT,
    channelID TEXT,
    messageID TEXT,
    targetID TEXT
);