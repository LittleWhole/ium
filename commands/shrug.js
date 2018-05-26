const Discord = require("discord.js");

module.exports = {
    name: 'shrug',
    description: 'Shrugs...',
	execute(bot, message, args){
        message.channel.send("¯\\_\(ツ)\_\/¯");
	},
};