module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute(bot, message, args){
		message.channel.send('Boop :robot:.');
	},
};