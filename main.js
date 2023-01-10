// Keep app going
// Importing the express module
const express = require('express');
var fs = require('fs');
const app = express();

// Initializing the data with the following string
var data = "MsgBot is running. "

// Sending the response for '/' path
app.get('/', (req, res) => {

    // Sending the data json text
    res.send(data);
})

// Setting up the server at port 3000
app.listen(3410, () => {
    console.log("server running");
});

var HackChat = require("hack-chat");
var chat = new HackChat(); // Client group for multiple channels
//chat.join("lobby", "TestUser");

var namelist = ["cxx_cjj", "defaultchannel001", "testchannel001"];
var botName = "MsgBot"
var sessions = [];
var msgListFile = "msgList.txt"

var maxMsg = 100;
var msgGiven = 20;
var waitInterval = 30000; // should be set to 30000
var writeInterval = 10000;

var msgList = [];
// Init msgList
for (var i = 0; i < namelist.length; i++) {
    msgList.push([]);
}

// Read msgList history
fs.readFile(msgListFile, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
    if (data != "none") msgList = JSON.parse(data);
})
// Write msgList history
setInterval(function () {
    fs.writeFile(msgListFile, JSON.stringify(msgList), (err, data) => {
        if (err) throw err;
    })
}, writeInterval);


function sleep(ms) {
    var start = Date.now(), end = start + ms;
    while (Date.now() < end);
    return;
}

function getLocalTime(n) {
    return new Date(parseInt(n)).toLocaleString("zh-CN");
}

function store(op, message) {
    if (op.length < maxMsg) {
        op.push(message);
    } else {
        op.splice(0, 1);
        op.push(message);
    }
    return op;
}

// Join each channel
var i = 0;
var id = setInterval(function () {
    sessions.push(chat.join(namelist[i], botName));
    i++;

    if (i >= namelist.length) clearInterval(id);
}, waitInterval);

/*
for(var i = 0; i<namelist.length; i++){
    sessions.push(chat.join(namelist[i], "MsgBot"));
}
*/

//var testSession001 = chat.join("testChannel001", "TestUser");
//chat.join("testChannel002", "TestUser");

chat.on("onlineSet", function (session, users) {
    // Each event from a group contains a session argument as first argument
    console.log("Users online in ?" + session.channel + ": " + users.join(", "));
    session.sendMessage("Hello everyone! MsgBot is online! ");
});

chat.on("info", function (session, text, time) {
    console.log("you're fucked. " + text);
});
chat.on("warn", function (session, text, time) {
    console.log("you're fucked. " + text);
});

chat.on("onlineAdd", function (session, nick, time) {
    var messageListToBeSend = "!!(del-" + nick + ") Hello, @" + nick + "! !!\n"
        + "These are the most recent " + msgGiven + " messages (if possible): \n";
    for (var i = msgList[namelist.indexOf(session.channel)].length - msgGiven; i < msgList[namelist.indexOf(session.channel)].length; i++) {
        messageListToBeSend += msgList[namelist.indexOf(session.channel)][i] + "\n";
    }

    session.sendMessage(messageListToBeSend);
})

chat.on("chat", function (session, nick, text, timestamp) {
    console.log(getLocalTime(timestamp) + "@" + nick + "@" + session.channel + ": " + text);

    if (nick != botName) {
        var a = msgList[namelist.indexOf(session.channel)];
        a = store(a, getLocalTime(timestamp) + "@" + nick + ": " + text);

        console.log(a);
    }

    if (text == "!msg") {
        var messageListToBeSend = "!!(del-" + nick + ") Hello, @" + nick + "! !!\n"
            + "These are the most recent " + maxMsg + " messages (if possible): \n";
        for (var i = 0; i < msgList[namelist.indexOf(session.channel)].length; i++) {
            messageListToBeSend += msgList[namelist.indexOf(session.channel)][i] + "\n";
        }

        session.sendMessage(messageListToBeSend);
    }
    /*if (session.channel != "programming") {
        programmingSession.sendMessage("Quote from ?" + session.channel + ": " + text);
    }*/

});