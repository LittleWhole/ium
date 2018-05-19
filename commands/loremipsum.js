const Discord = require('discord.js')

exports.run = (client, message, args, tools) => {

  var loremIpsum = require("lorem-ipsum")
, output     = loremIpsum()

  const loremIpsumEmb = new Discord.RichEmbed()
  .setColor("#000000")
  .setAuthor('Here is your randomly generated lorem ipsum!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJhr8sCfuluVWVRscrya6AgVT-9IBpuvQgQgyn9OATL1MZpAV')
  .setTitle('```' + output + '```')

  message.channel.send({embed: loremIpsumEmb})
}
