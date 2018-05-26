const Discord = require("discord.js")
const errors = require("../utils/errors.js")


  module.exports = {
      name: 'depricated',
      description: 'Shows depricated commands.',
      aliases: ['divide', 'subtract', 'add', 'multiply', 'minus', 'times', 'plus', 'wave', 'scale', 'day', 'date', 'report', 'welcome'],
      execute(bot, message, args){
        let deprecatedEmbed = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription(`This command is now deprecated <a:cursor:404001393360502805>`)
        .addField(`Depricated Commands`, "`add` -> `calculate`\n`divide` -> `calculate`\n`minus` -> `calculate`\n`times` -> `calculate`\n`exponent` -> `calculate`\n`day`\n`report`\n`scale`\n`wave`\n`welcome`")
        .setTimestamp();
        message.channel.send(deprecatedEmbed);
      },
  };