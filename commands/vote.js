const send = require('quick.hook');
const Discord = require('discord.js');

module.exports = {
    name: 'vote',
    description: 'Makes a vote in the server, and reacts with checkmark and x. (Poll is used for admins, vote command is used for normal users)',
    usage: '<vote>',
    args: true,
	execute(bot, message, args){
    
        let poll = args.join(" ");
    
        //message.delete();
    
        let announceEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTimestamp()
        .setTitle(poll)
    
        let m = await message.channel.send(announceEmbed);
        await m.react(`✅`);
        await m.react(`❌`);
	},
};