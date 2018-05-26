const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: 'slap',
    description: 'Slap someone.',
    usage: '<user>',
    args: true,
	execute(bot, message, args){
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

        neko.getSFWSlap().then(slap => {
            let slapEmbed = new Discord.RichEmbed()
                .setDescription(`**${message.author.username}** slaps **${member.user.username}**...`)
                .setImage(slap.url)
                .setFooter('Powered by nekos.life')
                .setColor(message.guild.me.displayColor)
                .setTimestamp();
            return message.channel.send({ embed: slapEmbed });
      })
	},
};