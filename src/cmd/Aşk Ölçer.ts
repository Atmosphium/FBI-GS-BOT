// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, Colors } from 'discord.js'

import { readFileSync, writeFileSync } from 'fs'

import { createCanvas, loadImage, registerFont } from 'canvas'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import { Başarısız } from '../template/Gömü'

// ============================================================================================================================================================== \\

registerFont ('./src/asset/font/Dancing Script 700.ttf', { family: 'Dancing Script' })

// İhracat

export const AşkÖlçer: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'aşkölçer',
    Açıklama: 'Birisi size ne kadar âşık?',
    Kategori: KomutKategorisi.Eğlence,
    Seçenekler: [{
        Tür: ApplicationCommandOptionType.User,
        Ad: 'kullanıcı',
        Açıklama: 'Aşkınızı ölçeceğiniz kullanıcı.',
        Gerekli: true
    }],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
        if (Etkileşim.user.id == Etkileşim.options.getUser ('kullanıcı', true).id) return Etkileşim.reply ({
            embeds: [Başarısız ('Kendi kendinize âşık olmanız birazcık... tuhaf değil mi sizce de? ^^')],
            ephemeral: true
        })

        if (Etkileşim.options.getUser ('kullanıcı', true).bot) return Etkileşim.reply ({
            embeds: [Başarısız ('Robotlar âşık olamaz efendim... onlar, maalesef ki henüz hisleri algılayamıyorlar. :/')],
            ephemeral: true
        })

        Etkileşim.deferReply ().then (ertelenmişYanıt => {
            const Veri = JSON.parse (readFileSync ('./src/db/Sevgiler.json', { encoding: 'utf-8' })),
                  Kullanıcı1 = Etkileşim.user,
                  Kullanıcı2 = Etkileşim.options.getUser ('kullanıcı', true),
                  kullanıcıVerisi = Veri [Kullanıcı1.id],
                  rastgeleSevgi = Math.floor (Math.random () * 101),
                  aradakiSevgi = kullanıcıVerisi ? kullanıcıVerisi [Kullanıcı2.id] ?? rastgeleSevgi : rastgeleSevgi

            const Tuval = createCanvas (3840, 2160),
                  Tablo = Tuval.getContext ('2d')
            
            loadImage ('./src/asset/img/Anime Arka Plan.jpg').then (animeArkaPlan => {
                Tablo.drawImage (animeArkaPlan, 0, 0, 3840, 2160)
            
                loadImage ('./src/asset/img/Kalpler Arka Plan.png').then (kalpArkaPlan => {
                    Tablo.drawImage (kalpArkaPlan, 0, 0, 3840, 2160)
            
                    Tablo.fillStyle = '#000000a0'
                    Tablo.fillRect (0, 0, 3840, 2160)
            
                    loadImage (`./src/asset/img/Kalp ${Math.round (aradakiSevgi / 10)}.png`).then (Kalp => {
                        Tablo.drawImage (Kalp, (1920 - Kalp.width / 2), (1080 - Kalp.height / 2))
            
                        Tablo.font = '288px Dancing Script'
                        Tablo.fillStyle = '#ffffff'
                        Tablo.textAlign = 'center'
                        Tablo.textBaseline = 'middle'
                        Tablo.fillText (Kullanıcı1.username, 1920, 640)
                        Tablo.fillText (Kullanıcı2.username, 1920, 1408)
        
                        const Görsel = new AttachmentBuilder (Tuval.toBuffer ('image/png'), { name: `${Kullanıcı1.username} ve ${Kullanıcı2.username} aşkı.png` })

                        Etkileşim.editReply ({
                            embeds: [{
                                color: Colors.LuminousVividPink,
                                author: {
                                    icon_url: Etkileşim.user.displayAvatarURL (),
                                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                                },
                                title: 'Aşk Ölçer',
                                description: `**${Kullanıcı2} diye bir bal, ${Kullanıcı1} diye bir bala %${aradakiSevgi} âşık!**`,
                                footer: {
                                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                    text: 'FBI Gizli Servisi — Habbo\'nun ilk ve tek resmî şirketi!'
                                }
                            }],
                            files: [Görsel]
                        }).then (İleti => {
                            İleti.edit ({
                                embeds: [{
                                    color: Colors.LuminousVividPink,
                                    author: {
                                        icon_url: Etkileşim.user.displayAvatarURL (),
                                        name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                                    },
                                    title: 'Aşk Ölçer',
                                    description: `**${Kullanıcı2} diye bir bal, ${Kullanıcı1} diye bir bala %${aradakiSevgi} âşık!**`,
                                    image: {
                                        url: İleti.attachments.first ()?.url ?? Kullanıcı1.displayAvatarURL ()
                                    },
                                    footer: {
                                        icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                        text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                                    }
                                }],
                                files: []
                            })
                        })
                    })
                })
            })
            
            kullanıcıVerisi ? Veri [Kullanıcı1.id] [Kullanıcı2.id] = aradakiSevgi : Veri [Kullanıcı1.id] = { [Kullanıcı2.id]: aradakiSevgi }

            writeFileSync ('./src/db/Sevgiler.json', JSON.stringify (Veri))
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * Komutu kullanmayan 2 kişi arasındaki sevgiyi ölçme özelliği eklenecek.
 * Kullanıcı menü komutu eklenecek.
 */

// ============================================================================================================================================================== \\