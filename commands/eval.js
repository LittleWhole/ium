const Discord = require("discord.js")
const errors = require("../utils/errors.js")

module.exports = {
    name: 'eval',
    description: 'ium runs the code you give it.',
    usage: '<code>',
    aliases: ['run', 'exec'],
    args: true,
	execute(bot, message, args){
    if(message.author.id !== '275831434772742144') return errors.noTetra(message, "eval");;
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
  console.log(`\n${message.author.username}#${message.author.discriminator} Used .Eval Command On ${message.guild.name}`)
    let argresult = args.join(' ');
  
        try {
  
          var evaled = eval(argresult);
  
          if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);
         if (evaled.includes(bot.token)) {
            console.log(`\n${message.author.username}#${message.author.discriminator} Try To Get The Bot Token On ${message.guild.name} (ServerID: ${message.guild.id}).\n`)
            return message.channel.send("", {
             embed: {
                color: 0xFF5733,
                title: ':exclamation::exclamation: No :exclamation::exclamation:',
                description: `No Token For You!`
             }
            });
          }
  
          let embed = new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Success:`, `** **`)
          .addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```")
          .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
          .setColor("#bf8aff")
          .setFooter(message.createdAt, message.author.avatarURL)
          message.channel.send({embed})
  
        } catch (err){
            console.error(err);
          message.channel.send(new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Error:`, "There Was a Problem With The Code That You Are Trying To Run!")
          .addField(":no_entry: ERROR", "```" + clean(err) + "```")
          .setColor("#bf8aff")
          .setFooter(message.createdAt, message.author.avatarURL))
          
              .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
        }
	},
};