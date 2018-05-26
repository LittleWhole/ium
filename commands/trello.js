const Discord = require("discord.js");

  const Discord = require("discord.js");
  const meme = require('memejs');
  
  module.exports = {
      name: 'trello',
      description: 'Provides a link to the trello (to do list) for ium.',
      execute(bot, message, args){
        let devEmbed = new Discord.RichEmbed()
        .setColor('#ffffff ')
        .addField("ium's trello", "https://trello.com/b/3kvrAbIV/ium")
    
        message.channel.send(devEmbed);
      },
  };