const Discord = require("discord.js");
const errors = require("../utils/errors.js")

module.exports = {
  name: 'clear',
  description: 'Deletes a certain amount of messages you give it. (Cannot delete more that 100 messages at once, and messages that are 14 days or older.)',
  aliases: ['purge', 'delete', 'prune'],
  usage: '<value>',
  args: true,
	execute(bot, message, args) {
    	if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "clear");

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('**That doesn\'t seem to be a valid number.**');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('**You must to provide a number between 1 and 99.**');
		}

		if (amount == 2){
			message.channel.bulkDelete(amount, true).catch(err => {
				console.log(err);
				message.channel.send('**There was an error trying to prune messages in this channel!** (Cannot delete more that 100 messages at once, and messages that are 14 days or older.)');
			});
		
			message.channel.send(`Deleted **${args[0]}** message.`).then(msg => msg.delete(5000));
		} else {
			message.channel.bulkDelete(amount, true).catch(err => {
				console.log(err);
				message.channel.send('**There was an error trying to prune messages in this channel!** (Cannot delete more that 100 messages at once, and messages that are 14 days or older.)');
			});
		
			message.channel.send(`Deleted **${args[0]}** messages.`).then(msg => msg.delete(5000));
		}
	},
};