const send = require('quick.hook');
const Discord = require('discord.js');
const errors = require("../utils/errors.js")

module.exports = {
    name: 'poll',
    description: 'Makes a poll in the server, and reacts with checkmark and x. (Poll is used for admins, vote command is used for normal users)',
    usage: '<poll>',
    args: true,
	async execute(bot, message, args){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You must have the permission **Manage Messages** to use this command. If you don't have that permission, and want to use this command, use: `ium vote <your text here>`");

        let poll = args.join(" ");

        message.delete();
    
        let announceEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTimestamp()
        .setTitle(poll)
    
        let m = await message.channel.send(announceEmbed);
        await m.react(`✅`);
        await m.react(`❌`);
	},
};