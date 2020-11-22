module.exports = {
    name: "skip",
    description: "skip music",
    async execute(client, message) {
        if (!message.member.voice.channel) 
            return message.channel.send(`You're not in a voice channel so can't skip the song `);
        
        client.player.skip(message);
    }
};
