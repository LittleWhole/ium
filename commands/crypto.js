const Discord = require("discord.js");
const request = require('request');

module.exports = {
    name: 'crypto',
    description: 'Retrieves CryptoCurrency information from CoinMarketCap.',
    usage: '<crypto-currency>',
    args: true,
	execute(bot, message, coin){
        const ticker = {
			'url': `https://api.coinmarketcap.com/v1/ticker/${coin}/`,
		};
		const global = {
			'url': `https://api.coinmarketcap.com/v1/${coin}/`,
		};

		if (coin === 'global') {
			request(global, (err, res, body) => {
				if (err) {
					console.error(err);
					return message.say('**Failed to retrieve global information from CoinMarketCap.**');
				}
				const info = JSON.parse(body);
				const cryptoGlobal = new Discord.RichEmbed()
					.setColor("#27ceff")
					.setTitle('Global Crypto Info')
					.addField('Total USD Market Cap', info.total_market_cap_usd, true)
					.addField('Total 24HR USD Volume', info.total_24h_volume_usd, true)
					.addField('Bitcoin % of Market Cap', info.bitcoin_percentage_of_market_cap, true)
					.addField('Active Currencies', info.active_currencies, true)
					.addField('Active Assets', info.active_assets, true)
					.addField('Active Markets', info.active_markets, true)
					.setFooter('Powered by CoinMarketCap')
					.setTimestamp();
				message.channel.send(cryptoGlobal);
			});
		} else {
			request(ticker, (err, res, body) => {
				if (err) {
					console.error(err);
					return message.channel.send('**Failed to locate cryptocurrency in CoinMarketCap.**');
				}
				const info = JSON.parse(body);
				const crypto = info[0];
				if (!crypto) return message.channel.send('**Failed to locate cryptocurrency in CoinMarketCap.**');

				const cInfo = new Discord.RichEmbed()
					.setColor("#27ceff")
					.setTitle(crypto.name)
					.addField('Symbol', crypto.symbol, true)
					.addField('Rank', crypto.rank, true)
					.addField('USD Price', crypto.price_usd, true)
					.addField('BTC Price', crypto.price_btc, true)
					.addField('USD Market Cap', crypto.market_cap_usd, true)
					.addField('Available Supply', crypto.available_supply, true)
					.addField('Total Supply', crypto.total_supply, true)
					.addField('Max Supply', crypto.max_supply, true)
					.setFooter('Powered by CoinMarketCap')
					.setTimestamp();
				message.channel.send(cInfo);
			});
		}
	},
};