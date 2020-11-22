module.exports = {
    name: "shuffle",
    description: "shuffle music",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't shuffle the song `);
      client.player.shuffle(message); 
    }
  };
  