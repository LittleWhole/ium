const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
  
   randomPuppy('memes')
  .then(url => {
                const memeEmbed = new Discord.RichEmbed()
                    .setTimestamp()
                    .setImage(url)
                    .setColor(`#39E4FA`)
                     message.channel.send(memeEmbed);
  })
}

module.exports.help = {
  name: "meme"
}