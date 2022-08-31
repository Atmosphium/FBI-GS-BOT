// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutları } from '../handler/Komutlar'

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import { Başarısız } from '../template/Gömü'

// ============================================================================================================================================================== \\

// İhracat

export const Yardım: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'yardım',
    Açıklama: 'Uygulamanın kullanım kılavuzu.',
    Kategori: KomutKategorisi.Özge,
    Seçenekler: [{
        Tür: ApplicationCommandOptionType.Number,
        Ad: 'kategori',
        Açıklama: 'Bilgi edinmek istediğiniz komut kategorisi.',
        Seçimler: [
            {
                Ad: '🎈 Eğlence',
                Değer: KomutKategorisi.Eğlence
            },
            {
                Ad: '🏨 Habbo',
                Değer: KomutKategorisi.Habbo
            },
            {
                Ad: '🔑 Moderasyon',
                Değer: KomutKategorisi.Moderasyon
            },
            {
                Ad: '✨ Özge',
                Değer: KomutKategorisi.Özge
            }
        ]
    }],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
            const komutKategorileri = new EmbedBuilder ({
                color: Colors.Blurple,
                author: {
                    icon_url: Etkileşim.user.displayAvatarURL (),
                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                },
                title: 'FBI Gizli Servisi — Uygulama Kullanım Kılavuzu',
                description: 'BİP! BOP! Şu robot efendiyle nasıl başa çıkacağım?!',
                fields: [
                    {
                        name: '/yardım eğlence',
                        value: 'Belki göbek atamam ama sizi birazcık eğlendirebilirim..! ^^'
                    },
                    {
                        name: '/yardım habbo',
                        value: 'FBI\'ın olmazsa olmazı Habbo... birkaç komut da onun hatrına olsun, ne dersiniz?'
                    },
                    {
                        name: '/yardım moderasyon',
                        value: 'Hop! Burası yalnızca yetkililer için!'
                    },
                    {
                        name: '/yardım özge',
                        value: 'Yukarıdaki 3 kategoriye de uymayan ✨ özel ✨ komutlar!'
                    }
                ],
                footer: {
                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                }
            }),
                  eğlenceKomutları = new EmbedBuilder ({
                color: Colors.LuminousVividPink,
                author: {
                    icon_url: Etkileşim.user.displayAvatarURL (),
                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                },
                title: 'FBI Gizli Servisi — Eğlence Komutları',
                description: 'BİP! BOP! Şu robot efendiyle nasıl başa çıkacağım?!',
                footer: {
                icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                }
            }),
                  habboKomutları = new EmbedBuilder ({
                color: Colors.Orange,
                author: {
                    icon_url: Etkileşim.user.displayAvatarURL (),
                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                },
                title: 'FBI Gizli Servisi — Habbo Komutları',
                description: 'BİP! BOP! Şu robot efendiyle nasıl başa çıkacağım?!',
                footer: {
                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                }
            }),
                  moderasyonKomutları = new EmbedBuilder ({
                color: Colors.Green,
                author: {
                    icon_url: Etkileşim.user.displayAvatarURL (),
                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                },
                title: 'FBI Gizli Servisi — Habbo Komutları',
                description: 'BİP! BOP! Şu robot efendiyle nasıl başa çıkacağım?!',
                footer: {
                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                }
            }),
                  özgeKomutlar = new EmbedBuilder ({
                color: Colors.Blurple,
                author: {
                    icon_url: Etkileşim.user.displayAvatarURL (),
                    name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                },
                title: 'FBI Gizli Servisi — Özge Komutlar',
                description: 'BİP! BOP! Şu robot efendiyle nasıl başa çıkacağım?!',
                footer: {
                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                }
            })
    
        SöyleşiBölümüGirdiKomutları.forEach (Komut => {
            if (Komut.Kategori == KomutKategorisi.Eğlence) return eğlenceKomutları.addFields ({
                name: `/${Komut.Ad}`,
                value: Komut.Açıklama
            })

            if (Komut.Kategori == KomutKategorisi.Habbo) return habboKomutları.addFields ({
                name: `/${Komut.Ad}`,
                value: Komut.Açıklama
            })

            if (Komut.Kategori == KomutKategorisi.Moderasyon) return moderasyonKomutları.addFields ({
                name: `/${Komut.Ad}`,
                value: Komut.Açıklama
            })

            if (Komut.Kategori == KomutKategorisi.Özge) return özgeKomutlar.addFields ({
                name: `/${Komut.Ad}`,
                value: Komut.Açıklama
            })
        })
    
        const Gömüler = [komutKategorileri, eğlenceKomutları, habboKomutları, moderasyonKomutları, özgeKomutlar],
              Seçenek = Etkileşim.options.getNumber ('kategori'),
              Gömü = Seçenek ? Gömüler [Seçenek] : Gömüler [0]

        return Etkileşim.reply ({
            embeds: [Gömü]
        }).catch (Sorun => {
            Etkileşim.reply ({
                embeds: [Başarısız (`\`\`\`${Sorun.toString ()}\`\`\``)],
                ephemeral: true
            })
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * Müzik komutları eklendikten sonra özel yardım bölümü de eklenecek.
 */

// ============================================================================================================================================================== \\