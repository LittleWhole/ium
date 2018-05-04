
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {

    let target = message.mentions.users.first() || message.author;
    let wait = await message.channel.send('Adding the magik...')

    let userAvatar = (target.displayAvatarURL);
    if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
        userAvatar = args.join(' ').replace(/gif|webp/g, 'png')
    }

    let res = await snekfetch.get(`https://discord.services/api/magik?url=${avatarurl}`)

    if (res.body == 'some error sry :/') {
            await wait.delete()
            return message.channel.send('**Image was invalid.**')
    } else {
            await wait.delete()

            const magikEmbed = new Discord.RichEmbed() 
                .setImage(`https://discord.services/api/magik?url=${avatarurl}`); 
            return message.channel.send(magikEmbed) 
        }
}