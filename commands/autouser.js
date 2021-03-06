const Discord = require("discord.js");
const sm = require("string-similarity");
const send = require("quick.hook");

module.exports = {
	name: 'autouser',
    description: 'Finds the closest user that resembles that name.',
    aliases: ['automember', 'completeuser', 'autoname'],
    usage: '<user>',
    args: true,
    execute(bot, message, args) {
        if(!args[0]) return message.reply("You need to type some text!");
        let members = [];
        let indexes = [];
        message.guild.members.forEach(function(member) {
            members.push(member.user.username);
            indexes.push(member.id);
        })
        let match = sm.findBestMatch(args.join(' '), members);
        let username = match.bestMatch.target;
        let member = message.guild.members.get(indexes[members.indexOf(username)]);
        
        const memberE = new Discord.RichEmbed()
        .setColor('#000000')
        .setDescription(`${member.user.tag}`);
    
        message.channel.send(memberE);
    },
};
    
