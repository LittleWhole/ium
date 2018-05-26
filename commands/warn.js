const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require("../warnings.json")

module.exports = {
    name: 'warn',
    description: 'Warns a user.',
    usage: '<user> <reason>',
    args: true,
	async execute(bot, message, args){
    if(!message.member.hasPermission("ADMINISTRATOR ")) return errors.noPerms(message, "warn");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("**User not found.**");
    if(!message.member.hasPermission("ADMINISTRATOR ")) return errors.noPerms(message, "warn");
    let reason = args.join(" ").slice(1);
  
    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };
  
    warns[wUser.id].warns++;
  
    fs.writeFile("../warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });
  
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#2f3136")
    .addField("Warned User", `<@${wUser.id}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);
  
    let warnchannel = message.guild.channels.find(`name`, "logs");
    if(!warnchannel) return message.reply("Couldn't find `logs` channel");
  
    warnchannel.send(warnEmbed);
    message.channel.send(warnEmbed)
  
    if(warns[wUser.id].warns == 1){
      message.guild.member(wUser).kick(reason);
      message.reply(`<@${wUser.id}> has been warned. One more warn, and <@${wUser.id}> will me muted.`)
    }
    if(warns[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(`name`, "muted");
      if(!muterole) return message.reply("`muted` role not found.");
  
      let mutetime = "10min";
      await(wUser.addRole(muterole.id));
      message.channel.send(`<@${wUser.id}> has been temporarily muted for \`10 minutes\`. One more warn, and <@${wUser.id}> will me kicked.`);
  
      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> has been unmuted.`)
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
      message.guild.member(wUser).kick(reason);
      message.reply(`<@${wUser.id}> has been kicked.`)
    }
	},
};