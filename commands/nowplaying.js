module.exports = {
    name: "nowPlaying",
    description: "Shows the queue of music",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't check which song is playing `);
        const song = client.player.nowPlaying(message);
        if(song == undefined) return message.channel.send("The queue is empty bruvva");
        const songTitle= song.title;
        return message.channel.send(`The tune currently playing is ${songTitle}`);
    }
  };
  