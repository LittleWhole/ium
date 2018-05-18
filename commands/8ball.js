const Discord = require("discord.js")

module.exports = {
	name: '8ball',
    description: 'Ask ium a question and it will answer.',
    aliases: ['eightball'],
    usage: '[Am I fat?]',
    args: true,
    execute(message, args) {
        //if(!args[1]) return message.channel.send("**Type a question with two or more words!** `ium 8ball Am I a furry`");
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "Nope", "I am not sure!", "Pls No", "You tell me"];
     
        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");
     
        let ballembed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#000000") 
        .addField("Question", question)
        .addField("Answer", replies[result]);
     
        message.channel.send(ballembed)
    },
};
    
