const Discord = require("discord.js");
const Fortnite = require("fortnite");
const tokens = require("../tokens.json");
const ft = new Fortnite(tokens.fortnite);

module.exports = {
    name: 'fortnite',
    description: 'Finds fortnite stats on the user you provide..',
    usage: '<platform [pc/xbox/ps4]> <username>',
    aliases: ['ftn'],
    args: true,
	execute(bot, message, args){
    let username = args[1];
    let platform = args[0];
    
    let colours = ['bf8aff',
                   '90e386',
                   'f55783',
                   '77c9ff',
                   '#ffffff']
    
    let result = Math.floor((Math.random() * colours.length));
                   
  
    let data = ft.getInfo(username, platform).then(data => {
  
      let stats = data.lifetimeStats;
      let kills = stats.find(s => s.stat == 'kills');
      let wins = stats.find(s => s.stat == 'wins');
      let kd = stats.find(s => s.stat == 'kd');
      let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
      let tPlayed = stats.find(s => s.stat == 'timePlayed');
      let asTime = stats.find(s => s.stat == 'avgSurvivalTime');  
      let rank = stats.find(s => s.stat == 'rank');
  
      let fortniteEmbed = new Discord.RichEmbed()
      .setColor(colours[result])
      .setTitle(`Statistics for ${data.username}`) 
      .setURL(data.url)
      .addField(`Top Placements:`, `\n*Top 3:* \`${data.lifetimeStats[0].value}\`\n*Top 5:* \`${data.lifetimeStats[1].value}\`\n*Top 6:* \`${data.lifetimeStats[3].value}\`\n*Top 12:* \`${data.lifetimeStats[4].value}\`\n*Top 25:* \`${data.lifetimeStats[5].value}\``) // We can have other information look different, in fields or in the description.
      .setThumbnail('https://i.imgur.com/vx8juC1.png')
      .addField('Total Score:', `\`${data.lifetimeStats[6].value}\``, true)
      .addField('Matches Played:', `\`${data.lifetimeStats[7].value}\``, true)
      .addField('Wins:', `\`${data.lifetimeStats[8].value}\``, true)
      .addField('Win Percentage:', `\`${data.lifetimeStats[9].value}\``, true)
      .addField('Kills:', `\`${data.lifetimeStats[10].value}\``, true)
      .addField('K/D Ratio:', `\`${data.lifetimeStats[11].value}\``, true)
      //.addField('Kills Per Minute:', `\`${data.lifetimeStats[12].value}\``, true)
      .setFooter('Requested by ' + message.author.username, message.author.displayAvatarURL)
      .setTimestamp();
      
      message.channel.send(fortniteEmbed)
      
  
      
      
    }).catch(e => {
      console.log(e);
      var noneEmbed = new Discord.RichEmbed()
      .setTitle("Please provide a vaild user.")
      .setThumbnail("https://i.imgur.com/vx8juC1.png")
      .setDescription("User not found in the Database!\nUsage `ium fortnite <platform> <username>`")
      message.channel.send(noneEmbed);
    });
  
	},
};