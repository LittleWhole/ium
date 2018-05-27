const Discord = require("discord.js");
const errors = require("../utils/errors.js")

module.exports = {
  name: 'createinvite',
  description: 'Creates a permanent invite link for your server.',
  aliases: ['ci'],
	execute(bot, message, args) {
        if(!message.member.hasPermission("CREATE_INSTANT_INVITE")) return errors.noPerms(message, "clear");
        message.channel.createInvite({maxAge: 0}).then(invite => {
          message.channel.send(`**Permanent Invite Link**: ${invite}`);
        });
	},
};