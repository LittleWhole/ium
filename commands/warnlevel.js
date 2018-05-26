
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require("../warnings.json")

module.exports = {
    name: 'warnlevel',
    description: 'Shows how many warns a user had.',
    usage: '<user>',
    args: true,
    aliases: ['warnlvl'],
	execute(bot, message, args){
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send("**User not found.**");
    let warnlevel = warns[wUser.id].warns;
  
    message.channel.send(`<@${wUser.id}> has \`${warnlevel}\` warnings.`);
	},
};