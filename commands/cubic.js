const Discord = require("discord.js");

module.exports = {
    name: 'cubic',
    description: 'I wonder what it does :think3d:',
	async execute(bot, message, args){
        const cubicembed = new Discord.RichEmbed()
        .setColor('#cbff09')
        .setAuthor(`Cubic`, `https://cdn.discordapp.com/avatars/309516307123142658/bca71a4e9f1edb6769ced64653801978.png?size=2048`)
        .setDescription(`Why, Cubic#6572! I know him! He’s an amazing, marvelous, magnificent,  glorious, stellar, outstanding, remarkable, excellent, sensational, fabulous, fantastic, extraordinary, incredible, brilliant, terrific and superb person! I wish I could meet him…`)
    
        message.channel.send(cubicembed);
	},
};