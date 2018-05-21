const request = require("request");

module.exports = {
	name: 'bitcoin',
    usage: '<curreny> <value>',
    args: true,
    async execute(bot, message, args) {
    
        if (args.length === 2) {
            var url = "https://blockchain.info/tobtc?currency=USD&value=" + args[1];
         } else if (args[2] === "bitcoin" || args[2] === "btc") {
         //	var url = "https://blockchain.info/to"
        } else {
            var url = "https://blockchain.info/tobtc?currency=" + args[2] + "&value=" + args[1];
        }

        request({ url: url, json: true}, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                message.channel.send(`\`${args[1]} ${args[0]}(s)\` to \`bitcoin\` -> \`${body}\``);
            }
        });
    },
};
    

