const fs = require('fs')

fs.readdir("./commands", (err, files) => {
  files.forEach(file => {
	  command = require("./commands/" + file)
	  console.log(file)
	  console.log(command.name)
	  console.log(command.description)
	  console.log(command.aliases)
	  console.log(command.usage)
  });
})