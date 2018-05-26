const Discord = require("discord.js");
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

module.exports = {
    name: 'magik',
    description: 'Mocks someone or something.',
    usage: '<someone/something>',
    args: true,
	async execute(bot, message, args){
        let mockEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setDescription(args.map(randomizeCase))
        .setImage("https://cdn.discordapp.com/attachments/424889733043191810/425242569325150208/mock.jpg")
    
        message.channel.send(mockEmbed);
	},
};