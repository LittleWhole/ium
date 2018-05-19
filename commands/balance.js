

const Discord = require("discord.js");
let iumics = require("../data/money.json");

module.exports = {
	name: 'balance',
    description: 'Displays an enlarged image of a user\'s avatar, with a direct link to it.',
    aliases: ['bal', 'bank', 'money'],
    usage: '<user (optional)>',
    args: true,
    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    
        if(!user){
    
        if(!iumics[message.author.id]){
            iumics[message.author.id] = {
                iumics: 0
            };
        }
    
        let memberIumics = iumics[message.author.id].iumics;
        //let iumicsBalance = iumics[user.id].coins;
    
        let moneyEmbed1 = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("FFFFFF")
        .addField("💰Total iumics", `You have a total of **${memberIumics}** iumics`);
    
        return message.channel.send(moneyEmbed1);
    
    }
    
    
        if(!iumics[user.id]){
            iumics[user.id] = {
                iumics: 0
            };
        }
    
        let userIumics = iumics[user.id].iumics;
    
        let moneyEmbed2 = new Discord.RichEmbed()
        .setAuthor(member.user.username)
        .setColor("FFFFFF")
        .addField("💰Total iumics", `**${user}** has a total of **${userIumics}** iumics`);
    
        return message.channel.send(moneyEmbed2);
    },
};
    
