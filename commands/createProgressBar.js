module.exports = {
  name: "createProgressBar",
  description: "Create a progress bar for the queue of the server",
   async execute(client,message) {
    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel `);

    const progress = client.player.createProgressBar(message, {timecodes:true});
    return message.channel.send(progress); 
  }
};