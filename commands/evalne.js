const Discord = require("discord.js")
const errors = require("../utils/errors.js")

exports.run = (bot, message, args) => {
    if(message.author.id !== '275831434772742144') return errors.noTetra(message, "eval");;
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
  console.log(`\n${message.author.username}#${message.author.discriminator} Used .Eval Command On ${message.guild.name}`)
    let argresult = args.join(' ');
    if (message.author.id !==  '275831434772742144') {
           // Check if user have Permissions to use the command
          message.channel.send('You Don\'t Have Permissions To Use This Command !'); // Send Message to the channel if they dont have permissions
          return; // Returns the code so the rest doesn't run
        }
        if (!argresult) {
          return message.channel.send("Please Specify a Code To Run!");
        }
  
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
  

          message.channel.send(`${bot.user.username} - JavaScript Eval Success:\n\n:inbox_tray: **INPUT**,\n \`\`\`${args.join(" ")}\`\`\`\n\n:outbox_tray: **OUTPUT**\n\`\`\`${clean(evaled)}\`\`\``)
  
        } catch (err){
            console.error(err);

          message.channel.send(`${bot.user.username} - JavaScript Eval Error:\nThere Was a Problem With The Code That You Are Trying To Run!\n:no_entry: ERROR\n\`\`\`${clean(err)}\`\`\``)
          
              .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
        }

}