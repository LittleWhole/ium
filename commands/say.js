module.exports = {
    name: 'say',
    description: 'Says what you say.',
    usage: '<text>',
    args: true,
    aliases: ['echo', 'repeat'],
	execute(bot, message, args){
        const sayMessage = args.join(" ");
    
        //message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
	},
};