const shorten = require('isgd');

module.exports = {
    name: 'reload',
    description: 'Reloads the command you provide.',
    usage: '<URL>',
    args: true,
	async execute(bot, message, args){
    if (!args[1]) {

      shorten.shorten(args[0], function(res) {
        if (res.startsWith('Error:')) return message.channel.send('**Please enter a valid URL**');
   
        message.channel.send(`**<${res}>**`);
   
      })
   
    } else {
   
      shorten.custom(args[0], args[1], function(res) {
        if (res.startsWith('Error:')) return message.channel.send(`**${res}**`);
   
        message.channel.send(`**<${res}>**`);
   
   
      })
   
    }
	},
};