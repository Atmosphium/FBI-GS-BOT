const { Collection, CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOptionType, Colors, ButtonBuilder, EmbedBuilder, ComponentType, ButtonStyle } = require ('discord.js')
const { emb, txt } = require ('../templates/şablonlar')

const Fetch = (...Seçenekler) => import ('node-fetch').then (({ default: Fetch }) => Fetch (...Seçenekler))

/** 
* @param { CommandInteraction } Etkileşim
* @param { CommandInteractionOptionResolver } Seçenekler
*/

exports.eylem = async (Etkileşim, Seçenekler) => {
    Etkileşim.deferReply ()

    const kullanıcıBilgisiFetch = await Fetch ('https://www.habbo.com.tr/api/public/users?name=' + Seçenekler.get ('ad').value),
          kullanıcıBilgisi = await kullanıcıBilgisiFetch.json ()

    if (Etkileşim.member.roles.cache.has (Etkileşim.guild.roles.cache.find (Rol => Rol.name == 'Üyeler'))) Etkileşim.editReply ({
        embeds: [
            emb.err (Etkileşim, 'Zatıalileriniz hâlihazırda mukayyet vaziyettedir efendim.')
        ]
    })

    if ('error' in kullanıcıBilgisi) return Etkileşim.editReply ({
        embeds: [
            emb.err (Etkileşim, 'Böyle bir müstefit namevcut efendim.')
        ]
    })
          
    const Başarılı = () => {
        const şifreOluştur = () => {
            let Şifre = ''

            const Karakterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

            for (let karakterİndeksi = 0; karakterİndeksi < 6; karakterİndeksi++) {
                Şifre += Karakterler [Math.floor (Math.random () * Karakterler.length)]
            }

            return Şifre
        }

        const Şifre = şifreOluştur ()

        Etkileşim.client.şifreler = new Collection ()
        Etkileşim.client.şifreler.set (Seçenekler.get ('ad').value, Şifre)

        Etkileşim.editReply ({
            embeds: [
                new EmbedBuilder ({
                    color: Colors.DarkButNotBlack,
                    author: {
                        name: `${Etkileşim.user.tag} tarafından kullanıldı`,
                        iconURL: Etkileşim.member.displayAvatarURL ()
                    },
                    title: 'Siz... gerçekten siz misiniz?',
                    description: 'Kişiliğinizin filhakika ' + Seçenekler.get ('ad').value + ' olduğunu tasdik etmek için verilen şifreyi Habbo avatarınızın motto bölümüne yazın, daha sonra ise `Onayla` butonuna tıklayın.',
                    fields: [
                        {
                            name: 'Şifreniz',
                            value: '```\n<FBI> ' + Şifre + '\n```'
                        }
                    ],
                    footer: {
                        text: Etkileşim.client.bilgi.ad + ' • ' + txt.mmt,
                        iconURL: Etkileşim.client.user.displayAvatarURL ()
                    }
                })
            ],
            components: [
                {
                    components: [
                        new ButtonBuilder ({
                            type: ComponentType.Button,
                            customId: 'kayıtOnayla',
                            style: ButtonStyle.Success,
                            label: 'Onayla'
                        })
                    ]
                }
            ]
        })
    }

    Etkileşim.guild.channels.fetch ('999891595862233160').then (eğitimForum => {
        eğitimForum.messages.fetch ().then (EFMesajlar => {
            const EFMesajı = EFMesajlar.find (EFMesaj => EFMesaj.content.includes (Seçenekler.get ('ad').value))

            if (!EFMesajı) {
                Etkileşim.guild.channels.fetch ('999891544616222801').then (terfiForum => {
                    terfiForum.messages.fetch ().then (TFMesajlar => {
                        const TFMesajı = TFMesajlar.find (TFMesaj => TFMesaj.content.includes (Seçenekler.get ('ad').value))

                        if (!TFMesajı) {
                            Etkileşim.reply ({
                                embeds: [
                                    emb.err (Etkileşim, 'Bir bot olarak üzgünüm, zatıalileri buraya gayrıaitlerdir.')
                                ]
                            })
                        } else {
                            return Başarılı ()
                        }
                    })
                })
            } else {
                return Başarılı ()
            }
        })
    })
}

exports.yapılandırma = {
    başlık: 'Kayıt Ol',
    ad: 'kayıt',
    açıklama: 'FBI Discord derneğine kayıt olun.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'ad',
            description: 'Habbo kullanıcı adı.',
            required: true
        }
    ],
    yetki: ''
}