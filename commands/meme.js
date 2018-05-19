
const Discord = require("discord.js");
const meme = require('memejs');

exports.run = async (bot, message, args, level) => {
	let searchMessage = await message.channel.send('<a:typing:393848431413559296> Searching for memes in the database... ');
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  searchMessage.edit({embed});
})};
