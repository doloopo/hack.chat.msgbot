var HackChat = require("hack-chat");
var chat = new HackChat(); // Client group for multiple channels
//chat.join("lobby", "TestUser");

var namelist = ["testchannel001", "testchannel012"];
var botName = "MsgBot"
var sessions = [];

var maxMsg = 100;
var msgGiven = 20;

var msgList = [];
// Init msgList
for(var i = 0; i < namelist.length; i++) {
    msgList.push([]);
}

function sleep(ms){
    var start = Date.now(), end = start+ms;
    while(Date.now()<end);
    return;
}

function getLocalTime(n) {
    return new Date(parseInt(n)).toLocaleString("zh-CN");
}

function store(op, message) {
    if(op.length < maxMsg){
        op.push(message);
    } else {
        op.splice(0, 1);
        op.push(message);
    }
    return op;
}

// Join each channel
var i = 0;  
var id = setInterval(function(){
    sessions.push(chat.join(namelist[i], botName));
    i++;

    if(i>= namelist.length) clearInterval(id); 
}, 1000);

/*
for(var i = 0; i<namelist.length; i++){
    sessions.push(chat.join(namelist[i], "MsgBot"));
}
*/

//var testSession001 = chat.join("testChannel001", "TestUser");
//chat.join("testChannel002", "TestUser");

chat.on("onlineSet", function(session, users) {
    // Each event from a group contains a session argument as first argument
    console.log("Users online in ?" + session.channel + ": " + users.join(", "));
});

chat.on("chat", function(session, nick, text, timestamp) {
    console.log(getLocalTime(timestamp)+"@"+nick + "@" + session.channel + ": " + text);

    var a = msgList[namelist.indexOf(session.channel)];
    a = store(a, getLocalTime(timestamp)+"@"+nick+ ": " + text);

    console.log(a);
    /*if (session.channel != "programming") {
        programmingSession.sendMessage("Quote from ?" + session.channel + ": " + text);
    }*/
    
});