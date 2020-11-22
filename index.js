const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});



client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.id  == 779867519502254161 ) return
    console.log(oldMember.channelID);
    console.log(newMember.channelID);

    if(oldMember.channelID == null && newMember.channelID){
        let channel = client.channels.cache.get(newMember.channelID);
        channel.join().then(connection => {
            console.log("Joined channel")
           const dispatcher = connection.play(require("path").join(__dirname, './hello.mp3'));
           dispatcher.on('start', () => { 
               dispatcher.setVolume(0.200);
           }); 
           dispatcher.on('error', (err) => console.log(err)); 
          
            dispatcher.on('finish', () => channel.leave());


         }).catch(e => {
           console.error(e);
         })
        

    }
    else if(oldMember.channelID && newMember.channelID == null){
        let channel = client.channels.cache.get(oldMember.channelID);
        channel.join().then(connection => {
            console.log("Joined channel")
           const dispatcher = connection.play(require("path").join(__dirname, './weakestLink.mp3'));
           dispatcher.on('start', () => { //not working
               dispatcher.setVolume(0.200);
           }); 
           dispatcher.on('error', (err) => console.log(err)); //no errors
          
            dispatcher.on('finish', () => channel.leave());

         }).catch(e => {
           // Oh no, it errored! Let's log it to console :)
           console.error(e);
         })
    }
   
})


client.login(config.token);