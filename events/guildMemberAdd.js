const Discord = require("discord.js");

module.exports = (bot, member) => {
    const channel = member.guild.channels.find('name', "ium-events");
    if (!channel) return;
      //Embed Creation
      let memberEmbed = new Discord.RichEmbed()
      .setColor('#a193ff')
      .setDescription(`**${member}** has joined`)
      .setFooter(`ID - ${member.id}`)
      .setTimestamp();
  
    channel.send(memberEmbed);
  };