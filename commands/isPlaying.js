module.exports = {
    name: "isplaying",
    description: "isplaying music",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't stop the song `);
        if(client.player.isPlaying(message)){
          return message.channel.send("yes, kush bot is banging out the tunes.")
        }else{
          return message.channel.send("No, kush bot is not currently banging out the tunes.")
        }
    }
  };
  