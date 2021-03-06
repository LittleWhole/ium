const Discord = require("discord.js");
const bot = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const config = require("../botconfig.json");
const os = require('os');
const osu = require('os-utils');
const cpuStat = require("cpu-stat")
let version = config.version;

exports.run = (bot, message, args) => {
    var memory = Math.round((os.totalmem() - os.freemem()) / 1000000);
    var totalmem = Math.round(os.totalmem() / 1000000);  
    //var usersize = bot.users.length;
    let botAvatar = bot.user.displayAvatarURL;
    let uptime = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let usersize = bot.users.size;
    var text_channels = 0, voice_channels = 0;
    bot.channels.array().forEach(channel => {
      if (channel.type == 'text') {
        text_channels += 1;
      } else if (channel.type == 'voice') {
        voice_channels += 1;
      }
    });

    let users = 0;
    bot.guilds.map(g => users += g.memberCount);
    try {
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        
      let botEmbed = new Discord.RichEmbed()
  
      .setDescription("ium", )
      .setColor('#000000')
      .setThumbnail(botAvatar)
      .addField("Name", bot.user.username, true)
      .addField("Current Version", config.version, true)
      .addField("Born On", bot.user.createdAt)
      .addField('Users', + users + ' users', true)
      .addField("Servers", `${bot.guilds.size} servers.`, true)
      .addField("Text channels", text_channels, true)
      .addField("Voice Channels", voice_channels, true)
      .addField('RAM Usage', memory + 'MB / ' + totalmem + ' MB', true)
      //.addField("CPU", `md\n${os.cpus().map(i => `${i.model}`)[0]}`)
      .addField("CPU usage", `\`${percent.toFixed(2)}%\``,true)
      .addField("Uptime", uptime, true)
      .addField("Library",  `Discord.js`, true)
      .addField("Arch", `\`${os.arch()}\``,true)
      .addField('Server', os.hostname() + ' (' + os.type() + ')', true)
      .setTimestamp();
  
      message.channel.send(botEmbed);
      });
    } catch (err) {
      console.error(err);
      return message.channel.send(`An error occured: ${err}`);
    }
}

module.exports.help = {
  name: "stats"
}
