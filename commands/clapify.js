const Discord = require("discord.js");
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

module.exports = {
    name: 'clapify',
    description: 'Replaces the spaces in your sentence with clap emojis, and adds random capitalization.',
    aliases: ['clap', 'claptext'],
    usage: '<text> <text>',
    args: true,
	execute(bot, message, args){
        message.channel.send(args.map(randomizeCase).join(':clap:'));
	},
};