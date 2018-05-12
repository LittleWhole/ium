
const Discord = require("discord.js");
const meme = require('memejs');

exports.run = async (bot, message, args, level) => {
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  message.channel.send({embed});
})};
