const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utils/errors.js")



  const Discord = require("discord.js")
  const fs = require("fs");
  const errors = require("../utils/errors.js")
  
  module.exports = {
      name: 'unmute',
      description: 'Unmutes a user.',
      usage: '<user>',
      args: true,
      async execute(bot, message, args){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "unmute");

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.sendMessage("**Please mention an user or ID to mute.** `ium unmute <user id>`");

        let role = message.guild.roles.find(r => r.name === "muted")

        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

        await toMute.removeRole(role);
        message.channel.sendMessage("The user has been unmuted!");

      },
  };