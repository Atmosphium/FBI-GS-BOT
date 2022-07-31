const { ButtonInteraction, Colors, ButtonBuilder, EmbedBuilder, ComponentType, ButtonStyle } = require ('discord.js')
const { emb, txt } = require ('../templates/şablonlar')

const Fetch = (...Seçenekler) => import ('node-fetch').then (({ default: Fetch }) => Fetch (...Seçenekler))

/** 
* @param { ButtonInteraction } Etkileşim
*/

exports.eylem = async Etkileşim => {
    const kullanıcıAdı = Etkileşim.message.embeds [0].description.split (' ') [2],
          kullanıcıBilgisiFetch = await Fetch ('https://www.habbo.com.tr/api/public/users?name=' + kullanıcıAdı),
          kullanıcıBilgisi = await kullanıcıBilgisiFetch.json (),
          Motto = kullanıcıBilgisi.motto,
          ID = kullanıcıBilgisi.uniqueId,
          gruplarFetch = await Fetch ('https://www.habbo.com.tr/api/public/users/' + ID + '/groups'),
          Gruplar = await gruplarFetch.json ()

    if (Motto == '<FBI> ' + Etkileşim.client.şifreler.get (kullanıcıAdı)) {
        const Rozetler = [
            'g-hhtr-c66c3954a407da04d54912192cf21921',
            'g-hhtr-790a9c77367893b7ebd95bd231dbfbf2',
            'g-hhtr-8d44c8e3abe50f7c13619e3fb2e1e4ee',
            'g-hhtr-5626c10de2c314a974c690ba732f98c7',
            'g-hhtr-feab93007fcca0afc210059033261bad',
            'g-hhtr-36737afd8459c1bd2be4347a0d5187ea',
            'g-hhtr-b0be128b931823b67f83c3f173f48aa1',
            'g-hhtr-9825ff9d415522cc49d0c39d89128ea3',
            'g-hhtr-b2deaa7cf6fe2bd5b071ff4c01b2140b',
            'g-hhtr-ac21fe2156842d405a570f62b245dc0f',
            'g-hhtr-c919a048f1e25422e1b2c89fe4c2a90d',
            'g-hhtr-203a7c9d8a37c2e7e94705307841f99b',
            'g-hhtr-93790f5c1650facca09751ac7d18c654',
            'g-hhtr-21c3c46d928522c4f92ba1139c6b3278',
            'g-hhtr-78be2dfa8951fc5da40dae5ac28ba41c',
            'g-hhtr-ea26cf1b9df5d51cd2ad15c7b9567456',
            'g-hhtr-cdecbd87712358909b3572e2b2d75387',
            'g-hhtr-ebec20fd26bb49853189176e66c93ee1',
            'g-hhtr-de6d6e467ab8b3cd39cc81d3acffe71c'
        ]

        let Rozet = ''

        Etkileşim.message.edit ({
            components: [
                {
                    components: [
                        new ButtonBuilder ({
                            type: ComponentType.Button,
                            customId: 'kayıtOnayla',
                            style: ButtonStyle.Success,
                            label: 'Kayıt başarılı!',
                            disabled: true,
                        })
                    ]
                }
            ]
        })

        Rozetler.forEach (rozetID => {
            const Grup = Gruplar.find (Grup => Grup.id == rozetID)

            if (Rozet.length == 0) {
                Grup ? Rozet = Grup.name : ''
            } else {
                return
            }
        })

        Etkileşim.guild.roles.fetch ().then (Roller => {
            if (Rozet.length > 0) {
                const rütbeRolü = Roller.find (Rol => Rol.name == Rozet.replace (Rozet.split (' ') [0], ''))

                rütbeRolü ? Etkileşim.member.roles.add (rütbeRolü) : Etkileşim.reply ({
                    embeds: [
                        emb.err (Etkileşim, 'Şirketimize ait hiçbir rozete Habbo\'da sahip değilsiniz maalesef.')
                    ]
                })
            }
        })

        Etkileşim.editReply ({
            embeds: [
                emb.suc (Etkileşim, 'Başarıyla FBI Gizli Servisine kayıt oldunuz!')
            ]
        })
    } else {
        Etkileşim.message.edit ({
            components: [
                {
                    components: [
                        new ButtonBuilder ({
                            type: ComponentType.Button,
                            customId: 'kayıtOnayla',
                            style: ButtonStyle.Danger,
                            label: 'Kayıt başarısız!',
                            disabled: true,
                        })
                    ]
                }
            ]
        })

        Etkileşim.editReply ({
            embeds: [
                emb.err (Etkileşim, 'Lütfen, size verilen şifreyi mottonuza yazınız.')
            ],
            ephemeral: true
        })
    } 
} // ¥ FBI ¥ Savaş Danışm. » ASTN » ATMOS º