
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require("../warnings.json")

module.exports.run = async (bot, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.send("**User not found.**");
  let warnlevel = warns[wUser.id].warns;

  message.channel.send(`<@${wUser.id}> has \`${warnlevel}\` warnings.`);

}

module.exports.help = {
  name: "warnlevel"
}