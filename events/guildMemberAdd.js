const Discord = require('discord.js');
module.exports = member => {

};

const embed = new Discord.MessageEmbed()
.setTitle(`Sunucumuza `)
    .addField(`Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`Kayıt Edilen:`, `<@${member.id}> Kayıt Oldu`)
    .addField(`Verilen Rol:`, `<@&${erkek.id}> Rolleri Verildi`) 
    .addField(`Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`Yeni İsmin:`, `\`${tag} ${isim} • ${yas}\` Olarak Güncellendi`) 
    .addField(`Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
    .setThumbnail(message.author.avatarURL())
.setFooter(`Heartling Register`)
.setColor('RED')
client.channels.cache.get('796043030901555251').send(embed)