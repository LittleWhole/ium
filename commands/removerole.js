const Discord = require("discord.js");
const errors = require("../utils/errors.js")

module.exports = {
    name: 'removerole',
    description: 'Removes the role you provide from a user.',
    usage: '<user> <role>',
    args: true,
	async execute(bot, message, args){
    if(!message.member.hasPermissions("MANAGE_ROLES")) return errors.noPerms(message, "removerole");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("User not found.");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Role not found.");
  
    if(!rMember.roles.has(gRole.id)) return message.reply("This user doesn't have that role.");
    await(rMember.removeRole(gRole.id));
  
    await message.channel.send(`**${rMember} deos not have the role, ${gRole.name} anymore!**`)
  
    message.delete();
	},
};