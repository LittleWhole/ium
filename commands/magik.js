
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: 'magik',
    description: 'Adds magik to your image.',
    usage: '<link or useravtar>',
    args: true,
    aliases: ['magic'],
	async execute(bot, message, args){
        let target = message.mentions.users.first() || message.author;
        let wait = await message.channel.send('<a:loading:393852367751086090> Adding the magik...')
    
        let userAvatar = (target.displayAvatarURL);
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            userAvatar = args.join(' ').replace(/gif|webp/g, 'png')
        }
    
        let res = await snekfetch.get(`https://discord.services/api/magik?url=${userAvatar}`)
    
        await wait.delete()
    
        return message.channel.send(`https://discord.services/api/magik?url=${userAvatar}`) 
	},
};