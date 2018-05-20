const Discord = require("discord.js")

module.exports = {
    name: 'choose',
    description: 'ium chooses something between the two parameters you give it.',
    usage: 'Bread Eggs',
    aliases: ['pick'],
    args: true,
	execute(message) {
        let replies = [`${args[0]}`, `${args[1]}`];
        let result = Math.floor((Math.random() * replies.length));
     
        let chooseEmbed = new Discord.RichEmbed()
        .setColor("#000000")
        .addField("I choose...", replies[result]);
        message.channel.send(chooseEmbed)
	},
};