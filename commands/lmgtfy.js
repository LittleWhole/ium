// This command requires the package `strict-uri-encode`, to properly parse links.
const encode = require('strict-uri-encode');

module.exports = {
    name: 'lmgtfy',
    description: 'Searches your input up on google.',
    usage: '<text>',
    args: true,
	execute(bot, message, args){
    let question = encode(args.join(' ')); 

    let link = `https://www.lmgtfy.com/?q=${question}`;
    
    message.channel.send(`**<${link}>**`); 
	},
};