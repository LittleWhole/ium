const Discord = require("discord.js")

module.exports = {
    name: 'rate',
    description: 'Rates someone or something you provide from a scale of 1-10',
    usage: '<someone/something>',
    args: true,
    aliases: ['ign'],
	execute(bot, message, args){
    let ratings = ["0", "⭐ 1", "⭐⭐ 2", "⭐⭐⭐ 3", "⭐⭐⭐⭐ 4", "⭐⭐⭐⭐⭐ 5", "⭐⭐⭐⭐⭐⭐ 6",  "⭐⭐⭐⭐⭐⭐ 7", "⭐⭐⭐⭐⭐⭐⭐⭐ 8", "⭐⭐⭐⭐⭐⭐⭐⭐⭐ 9", "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 10"];

    let result = Math.floor((Math.random() * ratings.length));
    let user = message.mentions.users.first();
 
    let rateEmbed = new Discord.RichEmbed()
 
    .setAuthor(message.author.username)
    .setColor("#000000")
    .addField("Rate", args[0])
    .addField("Rating", ratings[result]);
 
    message.channel.send(rateEmbed)
	},
};