const errors = require("../utils/errors.js")

module.exports.run = async (bot, message) => {

    if (!['275831434772742144',].includes(message.author.id)) return errors.noTetra(message, "leave");
    message.channel.send('**Leaving** server...')
    message.guild.leave();
  };
