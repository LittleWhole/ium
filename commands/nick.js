const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports = {
    name: 'nick',
    description: 'Changes your nickname.',
    usage: '<new nick>',
    args: true,
	async execute(bot, message, args){
        message.member.setNickname(args[0]);
        message.channel.send(`Your nickname has been changed to **${args[0]}**`)
	},
};