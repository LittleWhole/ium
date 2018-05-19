const Discord = require("discord.js");
let inline = true


exports.run = async (bot, message, args) => {
    let botAvatar = bot.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setColor('#000000')
    .setDescription("Invite ium: https://ium-bot.github.io/invite")



    message.channel.send(botEmbed);
}


module.exports.help = {
    name: "invite"
}
