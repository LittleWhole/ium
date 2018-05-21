const Discord = require("discord.js");
const errors = require("../utils/errors.js")

module.exports = {
    name: 'inick',
    description: 'Changes ium\s username to what you provide.',
    usage: '<nickname>',
    aliases: ['botnick', 'iumnick'],
    args: true,
	execute(bot, message, args){
        if(message.author.id !== '275831434772742144') return errors.noTetra(message, "botnick");;
        bot.user.setUsername(args[0]);
	},
};