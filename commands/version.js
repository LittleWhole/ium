const Discord = require("discord.js");
const config = require("../botconfig.json");
let version = config.version;

module.exports = {
    name: 'version',
    description: 'Shows ium\'s current version',
    aliases: ['ver'],
	execute(bot, message, args){
        let verEmbed = new Discord.RichEmbed()
        .setDescription("Version")
        .setColor('#ffffff')
        .addField("Current Version", config.version)
        .addField("Made with", "discord.js v11.3 \nnpm v11.3.2 \nnode.js v8.10.0 and 💗");
        
        message.channel.send(verEmbed);
	},
};