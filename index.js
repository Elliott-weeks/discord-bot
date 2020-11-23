const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require("fs");

const { Player } = require("discord-player")

const player = new Player(client)
client.player = player;

// Then add some messages that will be sent when the events will be triggered
client.player

    // Send a message when a track starts
    .on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))

    // Send a message when something is added to the queue
    .on('trackAdd', (message, track) => {
        const length = track.tracks.length - 1;
        const songTitle = track.tracks[length].title;
        message.channel.send(`${songTitle} added to queue`);
    })




    .on('playlistAdd', (message, playlist) => message.channel.send(`${playlist.title} has been added to the queue (${playlist.items.length} songs)!`))

    // Send messages to format search results
    .on('searchResults', (message, query, tracks) => {

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Fellow kush dogs here is the response tings ${query}!`)
            .setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
            .setFooter('Hit me with a number bruvva')
        message.channel.send(embed);

    })
    .on('searchInvalidResponse', (message, query, tracks, content, collector) => message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`))
    .on('searchCancel', (message, query, tracks) => message.channel.send('woopsie bad response Knob head'))
    .on('noResults', (message, query) => message.channel.send(`No results found on YouTube for ${query}!`))

    // Send a message when the music is stopped
    .on('queueEnd', (message, queue) => message.channel.send('Music stopped as there is no more music in the queue!'))
    .on('channelEmpty', (message, queue) => message.channel.send('Music stopped as there is no more member in the voice channel!'))
    .on('botDisconnect', (message, queue) => message.channel.send('Music stopped as I have been disconnected from the channel!'))

    // Error handling
    .on('error', (error, message) => {
        switch (error) {
            case 'NotPlaying':
                message.channel.send('There is no music being played on this server!')
                break;
            case 'NotConnected':
                message.channel.send('You are not connected in any voice channel!')
                break;
            case 'UnableToJoin':
                message.channel.send('I am not able to join your voice channel, please check my permissions!')
                break;
            default:
                message.channel.send(`Something went wrong... Error: ${error}`)
        }
    })


client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('to type !help ', { type: 'LISTENING' });
});





const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
client.on("message", async message => {
    if (message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "play":
            client.commands.get('play').execute(client, message, args);
            break;
        case "stop":
            client.commands.get("stop").execute(client, message);
            break;
        case "skip":
            client.commands.get("skip").execute(client, message);
            break;
        case "shuffle":
            client.commands.get("shuffle").execute(client, message);
            break;
        case "pause":
            client.commands.get("pause").execute(client, message);
            break;
        case "resume":
            client.commands.get("resume").execute(client, message);
            break;
        case "isplaying":
            client.commands.get("isplaying").execute(client, message);
            break;
        case "nowplaying":
            client.commands.get("nowPlaying").execute(client, message);
            break;
        case "progress":
            client.commands.get("createProgressBar").execute(client, message);
            break;
        case "clear":
            client.commands.get("clearQueue").execute(client, message);
            break;
        case "help":
            client.commands.get("help").execute(message);
            break;
        case "kush":
            client.commands.get('kush').execute(message,args);
            break;          

    }



})





client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.id == 779867519502254161) return;

    if (oldMember.channelID == null && newMember.channelID) {
        let channel = client.channels.cache.get(newMember.channelID);
        channel.join().then(connection => {
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
    else if (oldMember.channelID && newMember.channelID == null) {
        let channel = client.channels.cache.get(oldMember.channelID);
        channel.join().then(connection => {
            const dispatcher = connection.play(require("path").join(__dirname, './weakestLink.mp3'));
            dispatcher.on('start', () => { //not working
                dispatcher.setVolume(0.200);
            });
            dispatcher.on('error', (err) => console.log(err)); //no errors

            dispatcher.on('finish', () => channel.leave());

        }).catch(e => {
            console.error(e);
        })
    }

})


client.login(config.token);
