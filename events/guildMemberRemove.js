const { RichEmbed } = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(member) {
    const settings = this.client.settings.get(member.guild.id);
    if(settings.userLog.toLowerCase() === "false") return;
    if(!member.guild.channels.get(settings.logChannel)) return;
    var byebyemsg = 
    [
        `**${member.user.tag}** is gone, Cries !!!`,
        `**${member.user.tag}** ran away seeing a :snake: :stuck_out_tongue_winking_eye:`,
        `We have lost our player **${member.user.tag}**!`,
        `We need a substitute for **${member.user.tag}**.`,
	    `Please say goodbye to **${member.user.tag}** we will miss you!`,
	    `**${member.user.tag}** left without telling bye :neutral_face: .`,
	    `I had sensed something wiered about **${member.user.tag}**`
    ] 
    var randomNumber = Math.floor(Math.random()*byebyemsg.length); 
    let msgToDisplay = (settings.leaveMsg.toLowerCase() === ("none" || "---")) ? byebyemsg[randomNumber] : settings.leaveMsg.replace(/{user}/g, `${member.user.tag}`).replace(/{server}/g,`${member.guild.name}`)
    const embed = new RichEmbed()
    .setColor(0xE0082d)
    .setDescription(msgToDisplay)
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.avatarURL);

    //trying to send the log detail to log channel   
    if(settings.userLogType == "1"){
      member.guild.channels.get(settings.logChannel).send(msgToDisplay)
    } else if(settings.userLogType == "2"){
      member.guild.channels.get(settings.logChannel).send({embed}).catch(err => console.error(err));
    } else if(settings.userLogType == "3"){
		// not showing this part of the code
    }
  }
};