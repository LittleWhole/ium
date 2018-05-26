const Discord = require("discord.js")
const errors = require("../utils/errors.js")
const childProcess = require("child_process");

module.exports = {
    name: 'exec',
    description: 'ium executes the code you give it, with an embed.',
    usage: '<code>',
    args: true,
	async execute(bot, message, args){

        function encode_utf8(s) {
            return unescape(encodeURIComponent(s));
        }
          
        function decode_utf8(s) {
            return decodeURIComponent(escape(s));
        }
          
        const clear = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        if(message.author.id !== '275831434772742144') return errors.noTetra(message, "exec");
        let msg = await message.channel.send("<a:loading:393852367751086090> Executing...");
        try {
        
        const code = args.join(" ");
        let evaled = childProcess.execSync(encode_utf8(code));
        
        console.log(typeof evaled)
        console.log(evaled)
        
        if (typeof evaled !== "string")
            evaled = evaled.toString();
        
            let woahembed = new Discord.RichEmbed()
            .setDescription("Evaluation successful. ")
            .addField(":inbox_tray: Input:", `\`\`\`sh\n${code}\n\`\`\``)
            .addField(":outbox_tray: Output:", `\`\`\`sh\n${clear(evaled)}\n\`\`\``)
            .setColor("#36393e")
            .setFooter("Evaluation Completed")
            .setTimestamp();
        
            message.channel.send(woahembed);
            msg.delete();
        
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`sh\n${clear(err)}\n\`\`\``);
        msg.delete();
        }
    
	},
};
