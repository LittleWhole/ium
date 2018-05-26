const Discord = require("discord.js")

module.exports = {
	  name: 'quote',
    description: 'ium will quote a message',
    aliases: ['quo', 'reference'],
    usage: '<message ID>',
    args: true,
    execute(bot, message, args) {
      try {
        let msg = message.channel.messages.get(args[0]);
        let author = msg.author
        var quote = new Discord.RichEmbed()
        .setAuthor(`${author.tag} said:`, author.avatarURL)
        .setDescription(`${msg.content}`)
        .setFooter(`Quoted by ${message.author.tag}`)
        .setColor(0x36393e);
      } catch(e) {
        var quote = new Discord.RichEmbed()
        .setTitle(":x: Error")
        .setDescription("Could not retrieve message! Maybe the bot was offline?")
        .setTimestamp()
        .setColor(0x36393e);
      } finally {
         message.channel.send({embed: quote});
      }
    },
};
    
