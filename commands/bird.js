const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const superAgent = require("superagent");

module.exports = {
	  name: 'bird',
    description: 'Displays a random picture of a bird.',
    aliases: ['birb'],
    async execute (message, args) {
      let{body} = await superAgent
      .get(`http://random.birb.pw/tweet.json/`);
    
      const birdEmbed = new Discord.RichEmbed()
      .setColor("#ffd8bb")
      .setImage(body.url)
      .setTitle("Bird :bird:")
      .setFooter("Powered by random.birb.pw");
      message.channel.send(birdEmbed)
    },
};
    
