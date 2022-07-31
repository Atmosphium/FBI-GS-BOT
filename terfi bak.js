const { ApplicationCommandOptionType, EmbedBuilder } = require ('discord.js')
const { emb, txt } = require ('./templates/şablonlar')

const Fetch = (...Seçenekler) => import ('node-fetch').then (({ default: Fetch }) => Fetch (...Seçenekler)),
      Moment = require ('moment-timezone')

exports.eylem = async (Uygulama, Etkileşim, Seçenekler) => {
    const kullanıcıBilgisiFetch = await Fetch ('https://www.habbo.' + Seçenekler.get ('otel').value + '/api/public/users?name=' + Seçenekler.get ('ad').value),
          kullanıcıBilgisi = await kullanıcıBilgisiFetch.json ()

    if ('error' in kullanıcıBilgisi) return Etkileşim.reply ({
        embeds: [
            emb.err (Uygulama, Etkileşim, 'Böyle bir müstefit namevcut efendim.')
        ]
    })

    Moment.locale ('tr')

    Etkileşim.reply ({
        embeds: [
            new MessageEmbed ({
                color: 'BLURPLE',
                author: {
                    name: `${Etkileşim.user.tag} tarafından kullanıldı`,
                    iconURL: Etkileşim.member.displayAvatarURL ()
                },
                image: {
                    url: 'https://www.habbo.' + Seçenekler.get ('otel').value + '/habbo-imaging/avatarimage?user=' + Seçenekler.get ('ad').value + '&action=wav&direction=2&head_direction=3&gesture=sml&size=l',
                    height: 220,
                    width: 128
                },
                title: Seçenekler.get ('ad').value + ' adlı Habbo\'nun kullanıcı bilgisi',
                fields: [
                    {
                        name: 'Otel',
                        value: ':flag_' + Seçenekler.get ('otel').value.replace ('com.', '').replace ('com', 'us') + ': ' + Seçenekler.get ('otel').name.split ('') [1],
                        inline: true
                    },
                    {
                        name: 'Durum',
                        value: kullanıcıBilgisi.online.toString ().replace ('true', 'Çevrim içi').replace ('false', 'Çevrim dışı'),
                        inline: true
                    },
                    {
                        name: kullanıcıBilgisi.online.toString ().replace ('true', 'Oyunda olduğu süre').replace ('false', 'En son giriş yaptığı süre'),
                        value: Moment (kullanıcıBilgisi.lastAccessTime).tz ('Europe/Istanbul').format ('D MMMM YYYY dddd, [saat] hh.mm A'),
                        inline: true
                    },
                    {
                        name: 'Motto',
                        value: kullanıcıBilgisi.online.toString ().replace ('true', 'Çevrim içi').replace ('false', 'Çevrim dışı'),
                        inline: true
                    }
                ],
                footer: {
                    text: Uygulama.bilgi.ad + ' • ' + txt.mmt,
                    iconURL: Uygulama.user.displayAvatarURL ()
                }
            })
        ]
    })
}

exports.yapılandırma = {
    başlık: 'Habbo Bilgisi',
    ad: 'terfibak',
    açıklama: 'Bir Habbo hakkında bilgi alın.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'ad',
            description: 'Habbo kullanıcı adı.',
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'otel',
            description: 'Habbo oteli.',
            choices: [
                {
                    name: '🇺🇸 Global',
                    value: 'com'
                },
                {
                    name: '🇹🇷 Türkiye',
                    value: 'com.tr'
                },
                {
                    name: '🇩🇪 Almanya',
                    value: 'de'
                },
                {
                    name: '🇧🇷 Brezilya',
                    value: 'com.br'
                },
                {
                    name: '🇫🇮 Finlandiya',
                    value: 'fi'
                },
                {
                    name: '🇫🇷 Fransa',
                    value: 'fr'
                },
                {
                    name: '🇳🇱 Hollanda',
                    value: 'nl'
                },
                {
                    name: '🇪🇸 İspanya',
                    value: 'es'
                },
                {
                    name: '🇮🇹 İtalya',
                    value: 'it'
                }
            ],
            required: true
        }
    ],
    yetki: ''
}