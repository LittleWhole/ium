const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports.run = async (bot, message, args) => {
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
if (!args[0]) return message.channel.send("**Mention a user to hug.** `ium hug <user>`");

neko.getSFWHug().then(hug => {
        let hugEmbed = new Discord.RichEmbed()
            .setDescription(`**${message.author.username}** hugs **${member.user.username}**...`)
            .setImage(hug.url)
            .setFooter('Powered by nekos.life')
            .setColor(message.guild.me.displayColor)
            .setTimestamp();
        return message.channel.send({ embed: hugEmbed });
  })
}
