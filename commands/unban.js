const Discord = require("discord.js")
const errors = require("../utils/errors.js")
  
  module.exports = {
      name: 'unban',
      description: 'Unbans someone from your server.',
      usage: '<UserID>',
      args: true,
      async execute(bot, message, args){
        if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "unban");
        const reason = args.slice(1).join(' ');
        unban.unbanAuth = message.author;
        const user = args[0];
        if (!user) return message.channel.send('You must supply a User Resolvable, such as a user id.').catch(console.error);
        message.guild.unban(user);
      },
  };