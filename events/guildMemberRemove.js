const Discord = require("discord.js");

module.exports = bot => {
    const channel = member.guild.channels.find('name', "ium-events");
    if (!channel) return;
      //Embed Creation
      let memberEmbed2 = new Discord.RichEmbed()
      .setColor('#66545e')
      .setDescription(`**${member}** has left`)
      .setFooter(`ID - ${member.id}`)
      .setTimestamp();
  
    channel.send(memberEmbed2);
  };