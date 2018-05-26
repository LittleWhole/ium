const Discord = require("discord.js")
const errors = require("../utils/errors.js")
const childProcess = require("child_process");

module.exports = {
    name: 'run',
    description: 'ium executes the code you give it, without an embed.',
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

    	if(message.author.id !== '275831434772742144') return errors.noTetra(message, "run");
		let msg = await message.channel.send("<a:loading:393852367751086090> Executing...");
		try {
  
		  const code = args.join(" ");
		  let evaled = childProcess.execSync(encode_utf8(code));
	
		  console.log(typeof evaled)
		  console.log(evaled)
	
		  if (typeof evaled !== "string")
			evaled = evaled.toString();
			
			if (evaled.length >= 2000) {
				message.reply(`Output was longer than 2000 characters (${evaled.length} to be exact!) You can find it in the console.`);
				return console.log(evaled);
			}
	
			msg.edit(`**Evaluation successful.**\n\n:inbox_tray: Input:\n\`\`\`sh\n${code}\n\`\`\`\n\n:outbox_tray: Output:\n\`\`\`sh\n${clear(evaled)}\n\`\`\`\n\`Evaluation Completed\``);
	
		} catch (err) {
		  msg.edit(`\`ERROR\` \`\`\`sh\n${clear(err)}\n\`\`\``);
		}
	},
};
