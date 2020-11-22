module.exports = {
    name: "stop",
    description: "stops music",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't stop the song `);
      client.player.stop(message); 
    }
  };
  