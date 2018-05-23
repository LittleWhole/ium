const errors = require("../utils/errors.js")

module.exports = {
    name: 'leave',
    description: 'Makes ium leave the server it\s in.',
	execute(bot, message, args){
    if (!['275831434772742144',].includes(message.author.id)) return errors.noTetra(message, "leave");
    message.channel.send('**Leaving** server...')
    message.guild.leave();
	},
};