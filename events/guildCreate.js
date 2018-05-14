const Discord = require("discord.js");
let inline = true;

module.exports = (bot, guild, member) => {
        const verlvl = {
            0: "None",
            1: "Low",
            2: "Medium",
            3: "(╯°□°）╯︵ ┻━┻",
            4: "(ノಠ益ಠ)ノ彡┻━┻"
        }

    let sicon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setAuthor("ium", "https://ium-bot.github.io/ium.jpg")
    .setColor('#f5a3fa')
    .setThumbnail(sicon)
    .setDescription("ium has been **added** to a server :)")
    .addField("Guild", `${guild}`, inline)
    .addField("Users", `${guild.memberCount}`, inline)
    .addField("Region", guild.region, inline)
    .addField("Roles", guild.roles.size, inline)
    .addField("Channels", guild.channels.size, inline)
    .addField("Large?", guild.large, inline)
    .addField("Creation", guild.createdAt)
    .addField("Owner", `${guild.owner} | \`${guild.ownerID}\``)
    .setFooter(`ID - ${guild.id}`)
    .setTimestamp();

    bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(guildEmbed));

  };