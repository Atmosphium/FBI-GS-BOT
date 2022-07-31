const { CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOptionType, PermissionsBitField, Colors, EmbedBuilder } = require ('discord.js');
const { emb, txt } = require ('../templates/şablonlar')

const { writeFileSync } = require ('fs')

/**
 * 
 * @param { CommandInteraction } Etkileşim 
 * @param { CommandInteractionOptionResolver } Seçenekler 
 * @returns 
 */

exports.eylem = (Etkileşim, Seçenekler) => {
    const Kullanıcı = Seçenekler.get ('kullanıcı').user,
          Gerekçe = Seçenekler.get ('neden').value

    if (Kullanıcı.bot) return Etkileşim.reply ({
        embeds: [
            emb.err (Etkileşim, 'Botları uyaramazsınız efendim. Onların yaptığı her şey caizdir.')
        ]
    })

    const Uyarılar = require ('../data/uyarılar.json'),
          Uyarı = { Kimlik: Etkileşim.id, Gerekçe: Gerekçe, Yetkili: Etkileşim.user.tag, Zaman: txt.mmt }

    Uyarılar [Kullanıcı.id] ? Uyarılar [Kullanıcı.id].push (Uyarı) : Uyarılar [Kullanıcı.id] = [Uyarı]

    writeFileSync ('./data/uyarılar.json', JSON.stringify (Uyarılar), { encoding: 'utf8' })

    Kullanıcı.send ({
        embeds: [
            new EmbedBuilder ({
                color: Colors.Red,
                title: 'Bir uyarı aldınız!',
                description: Etkileşim.user.tag + ' adlı yetkili size bir uyarı ikazı verdi.',
                fields: [
                    {
                        name: 'Uyarı Gerekçesi',
                        value: Gerekçe,
                        inline: true
                    },
                    {
                        name: 'Toplam Uyarı Sayınız',
                        value: Uyarılar [Kullanıcı.id].length,
                        inline: true
                    }
                ]
            })
        ]
    }).then (() => {
        Etkileşim.reply ({
            embeds: [
                emb.suc (Etkileşim, 'Kullanıcı başarıyla ikaz edildi.')
            ]
        })
    })
}

exports.yapılandırma = {
    başlık: 'Uyarı',
    ad: 'uyar',
    açıklama: 'Bir kullanıcıyı uyarın.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.User,
            name: 'kullanıcı',
            description: 'Uyarılacak kullanıcı',
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'neden',
            description: 'Uyarı gerekçesi',
            required: true
        }
    ],
    yetki: PermissionsBitField.Flags.KickMembers
}