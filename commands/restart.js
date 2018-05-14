module.exports.run = async (bot, message) => {

    if (!['275831434772742144',].includes(message.author.id)) return message.reply('**You cant do that, only the bot developer can!**');
    message.channel.send(`**Restarted** in ${Math.floor(bot.ping)}ms`).then(() =>{
    process.exit(1);
  })
};
   