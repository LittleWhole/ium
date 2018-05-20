const Discord = require("discord.js");

  module.exports = {
      name: 'developer',
      description: 'Shows ium\s developer.',
      execute(bot, message, args){
        message.channel.send(`ium is developed by \`Tetra#0002\``);
      },
  };