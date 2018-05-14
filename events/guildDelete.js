const Discord = require("discord.js");
let inline = true;

module.exports = async (bot, guild, member) => {
        const verlvl = {
            0: "None",
            1: "Low",
            2: "Medium",
            3: "(╯°□°）╯︵ ┻━┻",
            4: "(ノಠ益ಠ)ノ彡┻━┻"
        }

    const invite = await guild.channels.first().createInvite({
        maxAge: 0
    });

    let sicon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setColor('#34e7e4')
    .setThumbnail(sicon)
    .setDescription("ium has been **removed** from a server :(")
    .addField("Guild", `${guild}`, inline)
    .addField("Users", `${guild.memberCount}`, inline)
    .addField("Owner", guild.owner, inline)
    .addField("Region", guild.region, inline)
    .addField("Roles", guild.roles.size, inline)
    .addField("Channels", guild.channels.size, inline)
    .setFooter(`ID - ${guild.id}`)
    .setTimestamp();

    bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(guildEmbed));
    bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(`https://discord.gg/${invite.code}`));
  };