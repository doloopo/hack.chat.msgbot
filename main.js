var HackChat = require("hack-chat");
var chat = new HackChat(); // Client group for multiple channels
//chat.join("lobby", "TestUser");

var namelist = ["testchannel001", "testchannel002"];
var botName = "MsgBot"
var sessions = [];

var msgList = [];
// Init msgList
for(var i = 0; i < namelist.length; i++) {
    
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

}

// Join each channel
var i = 0;  
var id = setInterval(function(){
    sessions.push(chat.join(namelist[i], "MsgBot"));
    i++;

    if(i>= namelist.length) clearInterval(id); 
}, 5000);

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

    
    /*if (session.channel != "programming") {
        programmingSession.sendMessage("Quote from ?" + session.channel + ": " + text);
    }*/
    
});