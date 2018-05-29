const Discord = require("discord.js");
let inline = true

module.exports = {
    name: 'website',
    description: 'Links you to ium\'s website.',
    aliases: ['site'],
	async execute(bot, message, args){

        message.channel.send("ium's website: https://ium-bot.github.io/");
	},
};