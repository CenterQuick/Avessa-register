const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
  
if(!["781170112718831636"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`<a:halaycekenstriga:773511924544962561> **? YETKİN YOK ZA KULLANAMAZSIN ZA ¿** <a:halaycekenstriga:773511924544962561>`)
  
  
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let yazı = "Top Özellik Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top).setColor("RANDOM"));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "top", "teyit", "top-teyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}