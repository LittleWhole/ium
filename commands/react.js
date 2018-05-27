const Discord = require("discord.js");

module.exports = {
    name: 'react',
    description: 'The dumbest command I ever made (next to the beep command). ium reacts to your message.',
    aliases: ['ign'],
	async execute(bot, message, args){
        try {
            await message.react('🇦');
            await message.react('🇧');
            await message.react('🇨');
        }
        catch(error) {
            
        }
	},
};