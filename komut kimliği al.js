const { ApplicationCommandOptionType, MessageEmbed } = require ('discord.js')

exports.eylem = (Etkileşim, Seçenekler) => {
    if (Etkileşim.client.komutlar.has (Seçenekler.get ('ad').value)) {
        Etkileşim.reply ({
            embeds: [
                new MessageEmbed ({
                    color: 'BLURPLE',
                    author: {
                        name: Etkileşim.user.tag + ' tarafından kullanıldı',
                        iconURL: Etkileşim.member.displayAvatarURL ()
                    },
                    title: 'Komut Kimliği Alma',
                    description: `${Etkileşim.member}, işte \`${Seçenekler.get ('ad').value}\` adlı komutun DC kimlik numarası: \`${Etkileşim.client.komutKimlikleri.get (Seçenekler.get ('ad').value)}\``,
                    footer: {
                        text: Etkileşim.client.bilgi.ad,
                        iconURL: Etkileşim.client.user.displayAvatarURL ()
                    }
                })
            ],
            ephemeral: true
        })
    } else {
        Etkileşim.reply ({ embeds: [
            new MessageEmbed ({
                color: 'DARK_RED',
                author: {
                    name: Etkileşim.user.tag + ' tarafından kullanıldı',
                    iconURL: Etkileşim.member.displayAvatarURL ()
                },
                title: ':exclamation: Achtung! Achtung!',
                description: `Sistemde \`${Seçenekler.get ('ad').value}\` adlı bir komut bulunmamaktadır.`,
                ephemeral: true
            })
        ]})
    }
}

exports.yapılandırma = {
    başlık: 'Komut Kimliği Alma',
    ad: 'komutkimlik',
    yerelAdlar: {
        'en-US': 'cmdid',
        'en-GB': 'cmdid',
        'ru': 'удостовкомманды',
        'tr': 'komutkimlik'
    },
    açıklama: 'Belirttiğiniz komutun kimlik numarasını alırsınız.',
    yerelAçıklamalar: {
        'en-US': 'Delete the specified command.',
        'en-GB': 'Delete the specified command.',
        'ru': 'Удалить определявшую комманду.',
        'tr': 'Belirttiğiniz komutun kimlik numarasını alırsınız.'
    },
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'ad',
            description: 'GBT\'sine bakılacak komutun adı.',
            descriptionLocalizations: {
                'en-US': 'The name of the command that the ID will be got of.',
                'en-GB': 'The name of the command that the ID will be got of.',
                'ru': 'Имя комманды которой удостоверение будет получено.',
                'tr': 'GBT\'sine bakılacak komutun adı.'
            },
            required: true
        }
    ],
    yetki: 'GOD_TIER'
}