module.exports = {
    name: "clearQueue",
    description: "clear the  music queue",
    async execute(client,message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel so can't stop the song `)
        client.player.clearQueue(message);
        return message.channel.send("The queue has been cleared for you bruvva");
      
  }
}