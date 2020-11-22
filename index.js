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
    let newUserChannel = newMember.voiceChannelID
    let oldUserChannel = oldMember.voiceChannelID
    if(newUserChannel === undefined){
        let channel = client.channels.cache.get(oldMember.channelID);
        channel.join().then(connection => {
           // Yay, it worked!
           console.log("Successfully connected.");
           const dispatcher = connection.play(require("path").join(__dirname, './weakestLink.mp3'));
           dispatcher.on('start', () => { //not working
               dispatcher.setVolume(0.70);
           }); 
           dispatcher.on('error', (err) => console.log(err)); //no errors
           dispatcher.on('end', end => { //working fine

        });


         }).catch(e => {
           // Oh no, it errored! Let's log it to console :)
           console.error(e);
         })

    

   
     }
})


client.login(config.token);