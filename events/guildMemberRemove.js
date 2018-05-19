const Discord = require("discord.js");

module.exports = (bot, member, message) => {
  try {
    const channel = member.guild.channels.find('name', "arrivals");
    if (!channel) return;
    //Embed Creation
    let memberEmbed = new Discord.RichEmbed()
    .setColor('#f55783')
    .setTitle(`User Left`, member.displayAvatarURL)
    .setDescription(`${member.user.username} - \`${member.user.tag}\` has **left**`)
    //.setFooter(`${message.guild.memberCount} users`)
    .setTimestamp();

    channel.send(memberEmbed)

    member.guild.channels.get('447252295353237506').setName(`Total Users: ${member.guild.memberCount}`);
} catch (error) {
  console.error(error);
}
  };