const log = (İçerik) => console.log (İçerik)

// Uygulama Yapılandırması

const { Collection, Client, IntentsBitField, InteractionType, Colors, EmbedBuilder } = require ('discord.js'),
      FS = require ('fs')

const Uygulama = new Client ({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildIntegrations, IntentsBitField.Flags.GuildWebhooks]
})

Uygulama.bilgi = {
    ad: 'FBI Gizli Servisi', // Bot adı
    kimlik: '646701400084185093', // Bot ID'si
    anahtar: 'NjQ2NzAxNDAwMDg0MTg1MDkz.GYbYBc.jaDFF2fUXa6iO6OuunHuyotDHL52nmodbmGu0k', // Bot token'ı
    dernek: '622405967249932309', // Botun ana (bot yaratıcısının tam yetkili olduğu) derneğinin (sunucusunun) ID'si
    tanrı: '339514931277856778' // Bot yaratıcısının ID'si
}

Uygulama.komutlar = new Collection ()
Uygulama.komutKimlikleri = new Collection ()
Uygulama.yetkilendirme = new Collection ()

Uygulama.login (Uygulama.bilgi.anahtar)

Uygulama.on ('ready', () => {
    log (`${Uygulama.bilgi.ad} başarıyla etkinleştirildi!`)

    // Komutların Yüklenmesi

    FS.readdir ('./cmd/', (Yanlış, Belgeler) => {
        if (Yanlış) return

        Belgeler.forEach (Belge => {
            const Komut = require (`./cmd/${Belge}`)

            Uygulama.application?.commands?.create ({
                name: Komut.yapılandırma.ad,
                description: Komut.yapılandırma.açıklama,
                options: Komut.yapılandırma.seçenekler
            }).then (eklenenKomut => {
                Uygulama.komutKimlikleri.set (eklenenKomut.name, eklenenKomut.id)
                Uygulama.yetkilendirme.set (eklenenKomut.id, Komut.yapılandırma.yetki)
            })

            Uygulama.komutlar.set (Komut.yapılandırma.ad, Belge)
        })
    })
})

// Komutların Çalıştırılması

Uygulama.on ('interactionCreate', Etkileşim => {
    const Hata = (Mesaj) => {
        Etkileşim.reply ({
            embeds: [
                new EmbedBuilder ({
                    color: Colors.DarkRed,
                    title: ':exclamation: Achtung! Achtung!',
                    description: Mesaj
                })
            ],
            ephemeral: true
        })
    }

    if (Etkileşim.type == InteractionType.ApplicationCommand) {
        if (!Etkileşim.guild) return Hata ('Bu uygulama yalnızca [FBI Gizli Servisi derneği](https://discord.com/channels/483367902813356034) içindir ekselansları/majesteleri.')

        const { guildId, memberPermissions, user, commandName, commandId, options } = Etkileşim,
              [ dernekKimliği, üyeYetkileri, Kullanıcı, komutAdı, komutKimliği, Seçenekler ] = [ guildId, memberPermissions, user, commandName, commandId, options ]

        const komutDosyası = require ('./cmd/' + Uygulama.komutlar.get (komutAdı))

        if (Uygulama.komutlar.has (komutAdı)) {
            if (dernekKimliği == Uygulama.bilgi.dernek && Uygulama.yetkilendirme.get (komutKimliği) == 'GOD_TIER') {
                if (Kullanıcı.id !== Uygulama.bilgi.tanrı) return Hata ('Bunu söylemekten dolayı hayli müteessirim efendim, lakin mevzubahis eylemi gerçekleştirmek için gerekli salahiyetlere maalesef ki iye değilsiniz.')

                return komutDosyası.eylem (Etkileşim, Seçenekler)
            }

            if (!üyeYetkileri.has (Uygulama.yetkilendirme.get (komutKimliği))) return Hata ('Bunu söylemekten dolayı hayli müteessirim efendim, lakin mevzubahis eylemi gerçekleştirmek için gerekli salahiyetlere maalesef ki iye değilsiniz.')

            return komutDosyası.eylem (Etkileşim, Seçenekler)
        }
    }

    if (Etkileşim.type == InteractionType.MessageComponent) {
        if (Etkileşim) Etkileşim.deferReply ({ ephemeral: true }).then (() => {
            return require ('./btn/' + Etkileşim.customId).eylem (Etkileşim)
        })
    }
})

const kayıtEt = (Üye, kullanıcıAdı, Rozet) => {
    Üye.roles
}

Uygulama.on ('messageCreate', Gönderi => {
    if (Gönderi.author.bot) return

    const Dizelge = require ('./data/küfürler.json')

    let gönderiİçeriği = Gönderi.content

    Gönderi.content.split (' ').forEach (Sözcük => {
        if (Dizelge.includes (Sözcük)) {
            gönderiİçeriği = gönderiİçeriği.replace (Sözcük, 'bobba')
        }
    })

    if (Gönderi.content !== gönderiİçeriği) {
        Gönderi.delete ().then (silinmişGönderi => {
            silinmişGönderi.channel.fetchWebhooks (Webhooks => {
                Webhooks.each (Webhook => {
                    if (Webhook.name == silinmişGönderi.member.displayName) Webhook.send (gönderiİçeriği)

                    silinmişGönderi.channel.createWebhook (silinmişGönderi.member.displayName, {
                        avatar: silinmişGönderi.author.displayAvatarURL ()
                    }).then (Webhook_ => {
                        Webhook_.send (gönderiİçeriği)
                    })
                })
            })
        })
    }
})

/*const returna = async () => {

const Fetch = (...Seçenekler) => import ('node-fetch').then (({ default: Fetch }) => Fetch (...Seçenekler)),
      Guburlar = await Fetch ('https://www.habbo.com.tr/api/public/users/hhtr-f14da36b1aded9c6e0bf178412db7415/groups'),
      G = await Guburlar.json ()

      G.forEach (GG => {
        const a = GG.name,
              b = GG.id

        log ({[a]: b})
      })

}

returna ()*/