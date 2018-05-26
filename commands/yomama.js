const yoMamma = require('yo-mamma').default;

module.exports = {
    name: 'yomama',
    description: 'Sends a yomama joke.',
    aliases: ['yo-mamma', 'ym'],
	execute(bot, message, args){
        let joke = yoMamma();
        message.channel.send(joke)
	},
};