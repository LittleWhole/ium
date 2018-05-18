const errors = require("../utils/errors.js")

module.exports.run = async (bot, message) => {

    if (!['275831434772742144',].includes(message.author.id)) return errors.noTetra(message, "restart");
    message.channel.send(`**Restarted** in ${Math.floor(bot.ping)}ms`).then(() =>{
    process.exit(1);
  })
};
   