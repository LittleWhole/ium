module.exports = {
  name: 'calc',
  description: 'ium calculates something using given numbers and an operation.',
  usage: ['<operation> <num1> [<num2> (if needed)'],
  
  async execute(bot, message, args) {
   let f = [];
        
        function factorial (n) {
            if (n == 0 || n == 1) return 1;
            if (f[n] > 0) return f[n];
            
            return f[n] = factorial(n-1) * n;
        };
        
        const operation = args[0]
        const one = parseInt(args[1]);
        const two = parseInt(args[2]);
        
        if (isNaN(one)) return message.reply("Invalid number.");
        if (["add", "multiply", "divide", "exponent"].includes(operation) && isNaN(two)) return message.reply("This operation requires a second parameter.");
        
        // Extract properties from math
        const { pow, sqrt, floor, ceil } = Math;
        
        let ans;

        if (operation === "add") ans = one + two; 
        else if (operation === "subtract") ans = one - two;
        else if (operation === "multiply") ans = one * two;
        else if (operation === "divide") {
            if (two === 0) return message.reply("Cannot divide by 0.");
            ans = one / two;
        }
        else if (operation === "exponent") ans = pow(one, two);
        else if (operation === "sqrt") ans = sqrt(one, two || 2);
        else if (operation === "factorial") ans = factorial(one);
        else if (operation === "floor") ans = floor(one);
        else if (operation === "ceil") ans = ceil(one);
        
        message.reply(`The answer is \`${ans}\`.`);
    }
}
