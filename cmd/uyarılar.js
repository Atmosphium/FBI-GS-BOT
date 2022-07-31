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
    Etkileşim.deferReply ().then(() => {
        const Kullanıcı = Seçenekler.get ('kullanıcı').user

    if (Kullanıcı.bot) return Etkileşim.reply ({
        embeds: [
            emb.err (Etkileşim, 'Botları kimse uyaramadığı için pek tabii uyarılarının da bir dizelgesinin mevcudiyeti namümkündür saygıdeğer hazret.')
        ]
    })

    const Uyarılar = require ('../data/uyarılar.json')

    const Embed = new EmbedBuilder ({
        color: Colors.DarkOrange,
        title: Kullanıcı.tag + ' adlı kullanıcının uyarıları listesi:',
    })

    if (!Uyarılar [Kullanıcı.id]) return Etkileşim.editReply ({
        embeds: [emb.suc (Etkileşim, 'Kullanıcının hiçbir uyarısı yok.')]
    })

    Uyarılar [Kullanıcı.id].forEach (Uyarı => {
        if (Uyarı.Kimlik != undefined) Embed.addFields ({
            name: Uyarı.Kimlik + ' kimlikli uyarı',
            value: '**Yetkili:** ' + Uyarı.Yetkili + '\n**Gerekçe:** ' + Uyarı.Gerekçe + '\n**Uyarı anı:** ' + Uyarı.Zaman,
            inline: true
        })
    })

    if (Embed.data.fields) {Etkileşim.editReply ({
        embeds: [Embed]
    })
} else {
    Etkileşim.editReply ({
        embeds: [emb.suc (Etkileşim, 'Kullanıcının hiçbir uyarısı yok.')]
    })
}
    })
}

exports.yapılandırma = {
    başlık: 'Uyarılar',
    ad: 'uyarılar',
    açıklama: 'Bir kullanıcıyı uyarın.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.User,
            name: 'kullanıcı',
            description: 'Uyarılacak kullanıcı',
            required: true
        }
    ],
    yetki: PermissionsBitField.Flags.KickMembers
}