const Command = require('../base/Command.js');

class Subscribe extends Command {
  constructor(client) {
    super(client, {
      name: 'subscribe',
      description: 'Adds/Removes \`Subscriber\` role.',
      usage: 'subscribe',
	  category: 'Support'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
  try{
    if(this.client.guilds.get('358098380729221133').members.get(message.author.id)){
	  let allRoles = this.client.guilds.get('358098380729221133').members.get(message.author.id).roles.filter(r => r.id === '358107764603486209').array();
	  if (allRoles.length === 1){
		this.client.guilds.get('358098380729221133').members.get(message.author.id).removeRole('358107764603486209')
		if(message.guild && message.guild.id === "358098380729221133"){
		  message.reply(`\`Subscriber\` role has been removed from your profile.\nYou will now not recieve any notifications about updates and notices.`);				
		}else{
		  message.channel.send(`\`Subscriber\` role has been removed from your profile in the Bot's official server.\nYou will now not recieve any notifications about updates and notices.`);
		}	  
	  }else {
		this.client.guilds.get('358098380729221133').members.get(message.author.id).addRole('358107764603486209')
		if(message.guild && message.guild.id === "358098380729221133"){
			message.reply(`\`Subscriber\` role has been provided to you.\nYou will now recieve notifications about important updates and notices.`);				
		  }else{
			message.channel.send(`You now have the \`Subscriber\` role in the Bot's official server.\nYou will now recieve notifications about important updates and notices.`);
		  }	
	  }
	}else {
	  return message.reply('You are not in the official bot server, join it to get the role and be notified of the updates.');
	}
  }catch (error) {console.log(error)}
  }
}
module.exports = Subscribe;