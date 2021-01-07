const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:0:782596292257120288>`,
            '1': `<a:1:782596292664492043>`,
            '2': `<a:2:782596291518660608>`,
            '3': `<a:3:782595475978584104>`,
            '4': `<a:4:782595482622492672>`,
            '5': `<a:5:782595476871839775>`,
            '6': `<a:6:782595479024173077>`,
            '7': `<a:7:782595477119565845>`,
            '8': `<a:8:782595483105099796>`,
            '9': `<a:9:782595483137867796>`}[d];
          })
        }
    const kanal = member.guild.channels.cache.find(r => r.id === "782520932488183849");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = '<a:likya:782606502333775883> **Hesap Durumu: Güvenilir Değil.**'
  if (kurulus > 1296000000) kontrol = '<a:likya:782606499829514250> **Hesap Durumu: Güvenilir Gözüküyor.**'
    moment.locale("tr");
    const embed = new Discord.MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setColor('0xEFF3E6')
    .setDescription("\n<a:likyataci:782663194241662996> <@" + member + ">, Aramıza Katıldı! \n\n<a:likya_:782606498731130891> Senin Birlikte "+üyesayısı+" Kişiyiz. \n\n<a:likya_:782606498659696642> <@&782286438469075045> Birazdan Sizinle İletişime Geçicektir...\n\n<a:likya_:782606503701250078> Hesabınızın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\n<a:Likya_:782606498822881290> Müsait olduğunuzda `𝚃𝚑𝚎 𝙻𝚒𝙺𝚈𝙰` Odalarından Birine Geçip Kayıt Olabilirsiniz. \n\n<a:likyasb:782891100464611354> Tagımızı alarak bize destek çıkabilirsin. TAGIMIZ= `𓄎`\n")
kanal.send("||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@&782286438469075045>")    
kanal.send(embed)
});
  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     



//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "796056243386580992") 
     var rol = member.guild.roles.cache.get("796056251967864872") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------TAG-ROL----------------------\\     

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('796039663982084176'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "ϟ"; // Buraya Ekip Tag
  var tagrol = "796056235337056257"; // Buraya Ekip Rolünün ID
  var logKanali = "796361592735793163"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = "796039663982084176"; //Buraya sunucunuzun IDsini yazın
  let tag = "ϟ"; //Buraya tagınızı yazın
  let rol = "796056235337056257"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('796361592735793163').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     

//-----------------------İSİM-DEĞİŞTİRME----------------------\\     

client.on("guildMemberAdd", member => {
  member.setNickname(`ϟ İsim | Yaş`)
});

//-----------------------İSİM-DEĞİŞTİRME----------------------\\     

//------------------BOTUN-SESTE-KALMA-KOMUTU------------------------------\\

client.on("ready", () => {
client.channels.cache.get('796362721599029300').join();
})

//------------------BOTUN-SESTE-KALMA-KOMUTU------------------------------\\