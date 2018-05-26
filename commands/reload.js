const Discord = require("discord.js")
const fs = require("fs");
const errors = require("../utils/errors.js")

module.exports = {
    name: 'reload',
    description: 'Reloads the command you provide.',
    usage: '<command>',
    args: true,
	async execute(bot, message, args){
        if (!['275831434772742144',].includes(message.author.id)) return errors.noTetra(message, "reload");
    
        try{
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            let reloadE = new Discord.RichEmbed()
            .setTitle("Reloading.. <a:loading:393852367751086090>")
            .setDescription(`${args[0]}.js successfully reloaded.`)
        
            return message.channel.send(reloadE);
        }catch(e){
            return message.channel.send("**Command not found.**")
        }
	},
};