const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    try {
        await message.react('<:discord:314003252830011395>');
    }
    catch(error) {
        
    }
}


module.exports.help = {
    name: "react"
  }