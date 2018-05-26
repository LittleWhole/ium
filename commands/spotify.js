
const Discord = require('discord.js'); 

module.exports = {
    name: 'Spotify',
    description: 'Shows the song you or someone is playing.',
	execute(bot, message, args){
 
    let user = message.mentions.users.first() || message.author; 
 
    try {
     
        // Variables - These are the variables we will be using in the embed
        let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`; 
        let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`; 
        let trackName = user.presence.activity.details;
        let trackAuthor = user.presence.activity.state;
        let trackAlbum = user.presence.activity.assets.largeText; 
       
        const embed = new Discord.RichEmbed() 
          .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png') 
          .setColor(0x1ED760) 
          .setThumbnail(trackIMG) 
          .addField('Song Name', trackName, true) 
          .addField('Album', trackAlbum, true)
          .addField('Author', trackAuthor, false) 
          .addField('Listen to Track:', `[\`${trackURL}\`](trackURL)`, false); 
       
    
        message.channel.send(embed); 
  
    } catch (error) {
      console.error(error);
      //message.channel.send(error);
    }
	},
};