const Discord = require('discord.js')

module.exports = {
    name: 'lorimupsim',
    description: 'Sends you a randomly generated lorem ipsum.',
	execute(bot, message, args){
    let question = encode(args.join(' ')); 

    let link = `https://www.lmgtfy.com/?q=${question}`;
    
    message.channel.send(`**<${link}>**`); 
	},
};