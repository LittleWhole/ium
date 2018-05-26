const Discord = require("discord.js");
let inline = true

module.exports = {
    name: 'website',
    description: 'Links you to ium\'s website.',
    aliases: ['site'],
	async execute(bot, message, args){
        let botEmbed = new Discord.RichEmbed()
        .setColor('#000000')
        .setDescription("ium's website: https://ium-bot.github.io/")

        message.channel.send(botEmbed);
	},
};