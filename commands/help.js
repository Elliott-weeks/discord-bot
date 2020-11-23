module.exports = {
    name: "help",
    description: "return all the help commands",
     async execute(message) {
      return message.channel.send('List of all the possible commands: \
       \n !stop - Stops the current song. \
       \n !play <song name> - Searchs for the song. \
       \n !skip - Skips the current song. \
       \n !pause - Pauses the current song. \
       \n !resume - Resumes the current song. \
       \n !shuffle - Picks a random song from the queue. \
       \n !nowplaying - Tells you the song currently being played in the queue. \
       \n !isplaying - Tells you if there is a song being played. \
       \n !progress - Shows you how far through the current song is. \
       \n !clear - Clears all songs from the queue. \
       \n !kush <Weed Strain Name> - Provides a comprehensive description of your searched strain.'
       
       ); 
    }
  };