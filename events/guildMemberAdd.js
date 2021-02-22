const Discord = require('discord.js');
module.exports = member => {
const embed = new Discord.RichEmbed()
      .setTitle("Yeni Üye !")
      .setAuthor("Sunucumuza hoşgeldin! ")
      .setColor("RED")
      .setDescription("Kayıt olmak için @| Registry Hammer ile iletişime geçebilirsin.")
      .setThumbnail(message.author.avatarURL)
client.channels.get('803679527526989824').send(embed);
};
