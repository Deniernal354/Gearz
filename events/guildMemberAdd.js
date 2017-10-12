const { RichEmbed } = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(member) { 
    const settings = this.client.settings.get(member.guild.id);
    if(member.guild.roles.get(settings.autoRole)){
      member.addRole(settings.autoRole, "Defaut role selected in Bot's setting.")
    }

    if(settings.userLog.toLowerCase() === "false") return;
    if(!member.guild.channels.get(settings.logChannel)) return;
    var welcomemsg = 
    [
        `**${member}**, if our dog doesn't like you, we won't either !`,
        `Come in **${member}**, We are awesome :stuck_out_tongue_winking_eye: !!`,
        `You look hot **${member}** :kissing:`,
        `**${member}**, Around here NORMAL is just a setting on the Dryer.`,
        `**${member}**, Welcome to the Porch... where wasting time is considered.`,
        `**${member}**, be WISE ... **Dont DRINK & DRIVE** !!`,
        `Welcom Tursit **${member}**, We SPIK INGLISH.`,
        `Oh NO, Not you again **${member}**`,
        `**${member}**, DOORBELL BROKEN! Yell __"DING DONG"__ Loudly.`,
        `Yay! you made it **${member}**, Now the party can start.`,
        `I'm already disturbed, Please come in **${member}**.`,
        `**${member}**, Forget the DOGS ... **BEWARE OF KIDS** :stuck_out_tongue_winking_eye:`,
        `**${member}**, **SIT LONG**, **TALK MUCH**, **LAUGH OFTEN**`
    ]
    var randomNumber = Math.floor(Math.random()*welcomemsg.length);
    let msgToDisplay = (settings.joinMsg.toLowerCase() === "none") ? welcomemsg[randomNumber] : settings.joinMsg.replace(/{user}/g, `${member}`).replace(/{server}/g,`${member.guild.name}`)
    const embed = new RichEmbed()
    .setColor(0x66CC00)
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