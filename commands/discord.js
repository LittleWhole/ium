const Discord = require("discord.js");

  module.exports = {
      name: 'server',
      description: 'Shows ium\s support server.',
      aliases: ['support', 'botserver'],
      execute(bot, message, args){
        message.channel.send("**ium's server **https://discord.gg/Ac8HYtD");
      },
  };