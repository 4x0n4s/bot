CREATE TABLE 
IF NOT EXISTS 
permissions (
    guildID TEXT,
    roleID TEXT,
    userID TEXT,
    commandIdentifier TEXT,
    perm INT
);

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

CREATE TABLE 
IF NOT EXISTS 
blacklist (
    userID TEXT,
    authorID TEXT,
    reason TEXT
);
