module.exports = {
  name: "pause",
  description: "Song has been paused",
   async execute(client,message) {
    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel `);

    client.player.pause(message); 
  }
};
