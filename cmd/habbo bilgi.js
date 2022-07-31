const { CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOptionType, Colors, EmbedBuilder } = require ('discord.js')
const { emb, txt } = require ('../templates/şablonlar')

const Fetch = (...Seçenekler) => import ('node-fetch').then (({ default: Fetch }) => Fetch (...Seçenekler)),
      Moment = require ('moment')

/**
* @param { CommandInteraction } Etkileşim
* @param { CommandInteractionOptionResolver } Seçenekler
*/

exports.eylem = async (Etkileşim, Seçenekler) => {
    Etkileşim.deferReply ()

    const kullanıcıBilgisiFetch = await Fetch ('https://www.habbo.' + Seçenekler.get ('otel').value + '/api/public/users?name=' + Seçenekler.get ('ad').value),
          kullanıcıBilgisi = await kullanıcıBilgisiFetch.json ()

    if ('error' in kullanıcıBilgisi) return Etkileşim.editReply ({
        embeds: [
            emb.err (Etkileşim, 'Böyle bir müstefit namevcut efendim.')
        ]
    })

    Moment.locale ('tr')

    Etkileşim.editReply ({
        embeds: [
            new EmbedBuilder ({
                color: Colors.Blurple,
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
                        value: ':flag_' + Seçenekler.get ('otel').value.replace ('com.', '').replace ('com', 'us') + ': ' + Seçenekler.get ('otel').value,
                        inline: true
                    },
                    {
                        name: 'Durum',
                        value: kullanıcıBilgisi.online ? '🟢 Çevrim içi' : '⚫ Çevrim dışı',
                        inline: true
                    },
                    {
                        name: kullanıcıBilgisi.online ? 'Oyunda olduğu süre' : 'En son giriş yaptığı süre',
                        value: Moment ().diff (kullanıcıBilgisi.lastAccessTime, 'hours').toString () + ' saat ' + (Moment ().diff (kullanıcıBilgisi.lastAccessTime, 'minutes') - Moment ().diff (kullanıcıBilgisi.lastAccessTime, 'hours') * 60).toString (),
                        inline: true
                    },
                    {
                        name: 'Motto',
                        value: kullanıcıBilgisi.motto.replace ('¥', ':star:').replace ('»', '♣'),
                        inline: true
                    }
                ],
                footer: {
                    text: Etkileşim.client.bilgi.ad + ' • ' + txt.mmt,
                    iconURL: Etkileşim.client.user.displayAvatarURL ()
                }
            })
        ]
    })
}

exports.yapılandırma = {
    başlık: 'Habbo Bilgisi',
    ad: 'habbo',
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