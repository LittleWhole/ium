const Discord = require('discord.js'),
    arraySort = require('array-sort'),
    table = require('table');

module.exports = {
    name: 'invites',
    description: 'Shows how many members a user has invited.',
	async execute(bot, message, args){
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send('***I dont have the proper permission to access server invites!***');
        });
    
        invites = invites.array();
    
        arraySort(invites, 'users', { reverse: true });
    
        let possibleInvites = [['User', 'User']];
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
        });
    
    
        message.channel.send(`**Server Invites**\nLeaderboard\n\`\`\`${table.table(possibleInvites)}\`\`\``);
	},
};