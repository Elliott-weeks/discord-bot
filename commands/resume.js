module.exports = {
    name: "resume",
    description: "resumes music",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't stop the song `);
      client.player.resume(message); 
    }
  };
  