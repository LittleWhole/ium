const Discord = require('discord.js'),
      math = require('math-expression-evaluator');

module.exports = {
	name: 'asciify',
    description: 'Asciifies the text you give it.',
    aliases: ['ascii'],
    usage: '<text>',
    args: true,
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor(0xffffff);
    
        // Verify Input
        if (!args[0]) {
            
            // Configure Embed
            embed.setFooter('Please input an expression.');
            
            // Return & Send Embed
            return message.channel.send(embed);
            
        }
        
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
    
