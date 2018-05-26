const Discord = require('discord.js');
const superagent = require("superagent");
const send = require("quick.hook");

module.exports = {
    name: 'wur',
    description: 'Sends you a would you rather.',
    aliases: ['wouldyourather'],
	async execute(bot, message, args){
        const { body } = await superagent 
        .get('http://www.rrrather.com/botapi'); 
        const rEmbed = new Discord.RichEmbed() 
        .setTitle(`${body.title}`)
        .setURL(body.link)
        .setDescription(`${body.choicea} or ${body.choiceb}?`)
        .setFooter('Powered by rrather');
    
        message.channel.send(rEmbed);
	},
};