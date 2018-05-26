const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: 'users',
    description: 'Shows how many users ium is with.',
	async execute(bot, message, args){
    let users = 0;
    bot.guilds.map(g => users += g.memberCount);
    try {
        
      let botEmbed = new Discord.RichEmbed()
  
      .setDescription("ium", )
      .setColor('#000000')
      .addField('Users', + users + ' users', true)
      .setTimestamp();
  
      message.channel.send(botEmbed);
    } catch (err) {
      console.error(err);
      return message.channel.send(`An error occured: ${err}`);
    }
	},
};