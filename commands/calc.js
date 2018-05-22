module.exports = {
  name: 'calc',
  description: 'ium calculates something using given numbers and an operation.',
  usage: ['<operation> <num1> [<num2> (if needed)'],
  
  async execute(bot, message, args) {
        const operation = args[0]
        const one = parseInt(args[1]);
        const two = parseInt(args[2]);
        
        if (isNaN(one)) return message.reply("Invalid number.");
        if (["exponent"].includes(operation) && isNaN(two)) return message.reply("This operation requires a second parameter.");
        
        // Extract properties from math
        const { pow, sqrt, floor, ceil, sin, cos, tan } = Math;
        
        let ans;
        if (operation === "exponent") ans = pow(one, two);
        else if (operation === "sqrt") ans = sqrt(one, 2);
        else if (operation === "floor") ans = floor(one);
        else if (operation === "ceil") ans = ceil(one);
        else if (operation === "n-root") ans = pow(one, 1 / two);
        else if (operation === "sec") ans = 1 / cos(one * Math.PI / 180.0);
        else if (operation === "csc") ans = 1 / sin(one * Math.PI / 180.0);
        else if (operation === "cot") ans = 1 / tan(one * Math.PI / 180.0);
        else return message.reply("Invalid operation.");
        
        message.reply(`The answer is \`${ans}\`.`);
    }
}
