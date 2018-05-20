const Discord = require('discord.js'),
      math = require('math-expression-evaluator');

module.exports = {
	name: 'calculate',
    description: 'Calculates the expression you give it.',
    aliases: ['expression', 'process'],
    usage: '<expression>',
    args: true,
    execute(message, args) {
        const embed = new Discord.RichEmbed()
        
        // Evaluate Expression
        let result;
        try {
            
            result = math.eval(args.join(' '));
            
        } catch (e) { // This will catch any errors in the expression
            
            result = 'Error: "Invalid Input"';
            
        }
            
        // Configure Embed
        embed.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${result}\`\`\``);
            
        // Send Embed
        message.channel.send(embed);
    },
};
    
