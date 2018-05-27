const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const tokens = require("./tokens.json");
const Botspace = require('botlist.space');
const PlexiDevApi = require('plexibotsapi');
const api = new PlexiDevApi(tokens.plexitoken);
const botspace = new Botspace(botconfig.iumID, tokens.spaceToken);
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
    .addField("Channels", guild.channels.size, inline)
    .addField("Large?", guild.large, inline)
    .setFooter(`ID - ${guild.id}`)
    .setTimestamp();

    bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(guildEmbed));

    botspace.postServerCount(bot.guilds.size).then(() => { 
        console.log('Set the current bot\'s server count to ' + bot.guilds.size + ' guilds.');
    }).catch((e) => {
        console.error('Failed to post server count. ' + e.code);
        console.error(e);
    });

    let users = 0;
    bot.guilds.map(g => users += g.memberCount);

	api.postServers(bot.user.id, bot.guilds.size);
	api.postUsers(bot.user.id, users); // This will run it once first, the setInterval will then run it every 15 minutes.
	setInterval(function() {
	  api.postServers(bot.user.id, bot.guilds.size);
	  api.postUsers(bot.user.id, users);
	}, 900000); // This example posts your user & server counts once every 15 minutes.
  };