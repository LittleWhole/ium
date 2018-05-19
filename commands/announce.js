const send = require('quick.hook');
const Discord = require('discord.js');
const errors = require("../utils/errors.js")

module.exports = {
	name: 'announce',
    description: 'Makes a rich embed with your announcement in it.',
    aliases: ['announcement'],
    usage: '<announcement>',
    args: true,
    execute(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "announce");
        
        let split = '|';
        args = args.join(' ').split(split);
    
        for (var i = 0; i < args.length; i++) args[i] = args[0].trim();
    
        if(args[0]) args[0] = parseInt(`0x${args[0]}`);
    
        let option = {
            title: args[0] || 'Announcment',
            embedColor: args[0] || 0xffffff,
            icon: `https://cdn.discordapp.com/attachments/416294137118195742/430094358381854720/avatar.png`
        }
    
        const embed = new Discord.RichEmbed()
            .setColor(option.embedColor)
            .setTitle(option.title)
    
        if(option.message) embed.setDescription(option.message);
    
        message.delete();
    
        let announceEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTimestamp()
        .setTitle(option.title)
    
        message.channel.send(announceEmbed);
    },
};
    