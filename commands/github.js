const Discord = require("discord.js");

module.exports = {
    name: 'github',
    description: 'Provides a link to the github page of ium.',
	execute(bot, message, args){
        let githubEmbed = new Discord.RichEmbed()
        .setColor('#ffffff ')
        .addField("ium's github", "https://github.com/tetra-dev/ium")
    
        return message.channel.send(githubEmbed);
	},
};