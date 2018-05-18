const errors = require("../utils/errors.js")

module.exports.run = async (bot, message, args) => {
    if (!['275831434772742144',].includes(message.author.id)) return errors.noTetra(message, "off");
    await message.reply('**Shutting** down...');
    process.exit(0);
  };
