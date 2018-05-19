
const figlet = require('figlet');
const Discord = require("discord.js")

module.exports = {
	name: 'asciify',
    description: 'Asciifies the text you give it.',
    aliases: ['ascii'],
    usage: '<text>',
    args: true,
    execute(message, args) {
        var maxLen = 14 // You can modify the max characters here

        if(args.join(' ').length > maxLen) return message.channel.send('Only 14 characters admitted!')
      
        figlet(`${args.join(' ')}`, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
      
            message.channel.send(`${data}`, {code: 'AsciiArt'});
        });
    },
};
    
