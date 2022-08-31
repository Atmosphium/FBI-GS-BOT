// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, Colors, EmbedBuilder, ButtonBuilder, ChannelType, ComponentType, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, ActionRowData, ActionRowComponentData } from 'discord.js'

import Moment from 'moment-timezone'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import Roller from '../config/Roller'
import Kanallar from '../config/Kanallar'
import Cezalar from '../config/Cezalar'

import { UyarılarVT } from '../class/Uyarılar VT'

import { Başarılı, Başarısız } from '../template/Gömü'

import { EmojiSayılar } from '../func/EmojiSayılar'
import { GelecekCeza } from '../func/GelecekCeza'

// ============================================================================================================================================================== \\

Moment.locale ('tr')

// İhracat

export const Uyarı: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'uyarı',
    Açıklama: 'Uyarı sistemi.',
    Kategori: KomutKategorisi.Moderasyon,
    Seçenekler: [
        {
            Tür: ApplicationCommandOptionType.Subcommand,
            Ad: 'ver',
            Açıklama: 'Birisine uyarı verirsiniz.',
            Seçenekler: [
                {
                    Tür: ApplicationCommandOptionType.User,
                    Ad: 'kullanıcı',
                    Açıklama: 'Uyaracağınız kullanıcı.',
                    Gerekli: true
                },
                {
                    Tür: ApplicationCommandOptionType.String,
                    Ad: 'gerekçe',
                    Açıklama: 'Uyarı gerekçesi.',
                    Seçimler: [
                        {
                            Ad: '▪ Küfür veya argo kullanımı.',
                            Değer: 'Küfür veya argo kullanımından dolayı'
                        },
                        {
                            Ad: '▪ Reklam.',
                            Değer: 'Reklam yapmaktan dolayı'
                        },
                        {
                            Ad: '▪ BÜYÜK HARF kullanımı.',
                            Değer: 'BÜYÜK HARF kullanımından dolayı'
                        },
                        {
                            Ad: '▪ Spam veya flood.',
                            Değer: 'Spam veya flood yapmaktan dolayı'
                        },
                        {
                            Ad: '▪ Cinsellik, kan, vahşet ve şiddet içerikli paylaşımlar.',
                            Değer: 'Cinsellik, kan, vahşet ve şiddet içerikli iletilerden dolayı'
                        },
                        {
                            Ad: '▪ Siyaset, din, dil, ırk hakkında tartışmak.',
                            Değer: 'Siyaset, din, dil, ırk hakkında tartışmaktan dolayı'
                        },
                        {
                            Ad: '▪ Sunucuda kavga çıkartmak veya devam ettirmek.',
                            Değer: 'Sunucuda kavga çıkartmak veya devam ettirmekten dolayı'
                        },
                        {
                            Ad: '▪ Birinin izni olmadan ifşasını paylaşmak.',
                            Değer: 'Birinin izni olmadan ifşasını paylaşmaktan dolayı'
                        },
                        {
                            Ad: '▪ Sunucu üyelerini gereksiz yere etiketlemek, DM üzerinden taciz etmek.',
                            Değer: 'Sunucu üyelerini gereksiz yere etiketlemek, DM üzerinden taciz etmekten dolayı'
                        },
                        {
                            Ad: '▪ Kanalları amacı dışında kullanmak.',
                            Değer: 'Kanalları amacı dışında kullanmaktan dolayı'
                        },
                        {
                            Ad: '▪ Sunucu yetkililerine karşı çıkmak.',
                            Değer: 'Sunucu yetkililerine karşı çıkmaktan dolayı'
                        },
                        {
                            Ad: '▪ Müzik kanallarında birden fazla bot bulundurmak.',
                            Değer: 'Müzik kanallarında birden fazla bot bulundurmaktan dolayı'
                        },
                        {
                            Ad: '▪ Sunucuda retro hoteller hakkında konuşmak.',
                            Değer: 'Sunucuda retro hoteller hakkında konuşmaktan dolayı'
                        },
                        {
                            Ad: 'Üst rütbeye hitabette Bey/Hanım takısını atlamak.',
                            Değer: 'Üst rütbeye hitabette Bey/Hanım takısını atlamaktan dolayı'
                        }
                    ],
                    Gerekli: true
                },
                {
                    Tür: ApplicationCommandOptionType.Attachment,
                    Ad: 'kanıt',
                    Açıklama: 'Uyarı kanıt görüntüsü.',
                    Gerekli: true
                }
            ]
        },
        {
            Tür: ApplicationCommandOptionType.Subcommand,
            Ad: 'bak',
            Açıklama: 'Birisinin uyarılarına bakarsınız.',
            Seçenekler: [{
                Tür: ApplicationCommandOptionType.User,
                Ad: 'kullanıcı',
                Açıklama: 'Uyarılarına bakacağınız kullanıcı.',
                Gerekli: true
            }]
        },
        {
            Tür: ApplicationCommandOptionType.Subcommand,
            Ad: 'sil',
            Açıklama: 'Birisinin herhangi bir uyarısını silersiniz.',
            Seçenekler: [{
                Tür: ApplicationCommandOptionType.User,
                Ad: 'kullanıcı',
                Açıklama: 'Uyarısını sileceğiniz kullanıcı.',
                Gerekli: true
            }]
        },
        {
            Tür: ApplicationCommandOptionType.Subcommand,
            Ad: 'temizle',
            Açıklama: 'Birisinin tüm uyarılarını silersiniz.',
            Seçenekler: [{
                Tür: ApplicationCommandOptionType.User,
                Ad: 'kullanıcı',
                Açıklama: 'Uyarılarını sileceğiniz kullanıcı.',
                Gerekli: true
            }]
        }
    ],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
        const Kullanıcı = Etkileşim.guild?.members.resolve (Etkileşim.user.id),
              hedefKullanıcı = Etkileşim.options.getUser ('kullanıcı', true)

        if (!Kullanıcı?.roles.cache.has (Roller.Yetkili)) return Etkileşim.reply ({
            embeds: [Başarısız ('Bu komutu kullanmak için gerekli yetkilere iye değilsiniz.')],
            ephemeral: true
        })

        if (hedefKullanıcı.bot) return Etkileşim.reply ({
            embeds: [Başarısız ('Botlar uyarılamaz efendim. Onların yaptığı her şey caizdir.')],
            ephemeral: true
        })

        Etkileşim.deferReply ().then (ertelenmişYanıt => {
            const Uyarılar = new UyarılarVT (),
                  kullanıcınınUyarıları = Uyarılar.KullanıcınınUyarıları (hedefKullanıcı.id)

            switch (Etkileşim.options.getSubcommand ()) {
                case 'ver':
                    Uyarılar.Uyar ({
                        Uyaran: Etkileşim.user.id,
                        Uyarılan: hedefKullanıcı.id,
                        Gerekçe: Etkileşim.options.getString ('gerekçe', true),
                        Zaman: new Date (),
                        Kimlik: Etkileşim.id,
                        Kanıt: Etkileşim.options.getAttachment ('kanıt', true).url
                    }).then (Başarılı => {
                        Etkileşim.editReply ({
                            embeds: [Başarılı]
                        }).then (İleti => {
                            const System = Etkileşim.guild?.channels.resolve (Kanallar.Bildiriler.Sistem),
                                  YetkiliSS = Etkileşim.guild?.channels.resolve (Kanallar.YetkiliEG)

                            System?.isTextBased () ? System.send ({
                                embeds: [{
                                    color: Colors.Orange,
                                    title: 'Yeni bir uyarı!',
                                    description: `${Kullanıcı} adlı yetkili, ${hedefKullanıcı} adlı kullanıcıya bir uyarı verdi.

                                                  **Gerekçe:** ${Etkileşim.options.getString ('gerekçe', true)}`,
                                    footer: {
                                        icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                        text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                                    }
                                }]
                            }).then (async İleti_ => {
                                if (YetkiliSS?.type == ChannelType.GuildText) {
                                    const Webhooklar = await YetkiliSS.fetchWebhooks (),
                                          yetkiliWebhook = Webhooklar.find (Webhook => Webhook.name == Kullanıcı.displayName) ?? await YetkiliSS.createWebhook ({
                                            name: Kullanıcı.displayName,
                                            avatar: Kullanıcı.displayAvatarURL ()
                                          })

                                    yetkiliWebhook.send ({
                                        embeds: [{
                                            color: Colors.Navy,
                                            title: 'Uyarı Kanıtı',
                                            description: `${hedefKullanıcı} adlı kullanıcıya verilen [uyarının](${İleti_.url}) kanıtı:`,
                                            image: {
                                                url: Etkileşim.options.getAttachment ('kanıt', true).url
                                            }
                                        }]
                                    }).catch (Sorun => {
                                        Etkileşim.followUp ({
                                            content: Sorun,
                                            ephemeral: true
                                        })
                                    })
                                }
                            }).catch (Sorun => {
                                Etkileşim.followUp ({
                                    content: Sorun,
                                    ephemeral: true
                                })
                            }) : ''

                            hedefKullanıcı.send ({
                                embeds: [{
                                    color: Colors.Red,
                                    title: 'Bir uyarı aldınız!',
                                    description: `**${Etkileşim.options.getString ('gerekçe', true)}**, ${Etkileşim.user} adlı yetkili size bir uyarı verdi.`,
                                    fields: [{
                                        name: 'Toplam uyarı sayınız:',
                                        value: Uyarılar.KullanıcınınUyarıları (hedefKullanıcı.id).length.toString ()
                                    }],
                                    image: {
                                        url: Etkileşim.options.getAttachment ('kanıt', true).url
                                    }
                                }]
                            }).then (İleti => {
                                Etkileşim.followUp ({
                                    content: 'Kullanıcı, uyarıya dair bilgilendirildi.',
                                    ephemeral: true
                                })
                            }).catch (() => {
                                Etkileşim.followUp ({
                                    content: 'Kullanıcının özel iletileri gizli olduğundan dolayı uyarı konusunda bilgilendirilemedi.',
                                    ephemeral: true
                                })
                            })
                        }).then (() => {
                            if (kullanıcınınUyarıları.length < 2) return
    
                            Etkileşim.followUp ({
                                embeds: [
                                    {
                                        color: Colors.Red,
                                        title: 'Ceza zamanı!',
                                        description: `Sayın ${Kullanıcı}, ${hedefKullanıcı} adlı kullanıcının son uyarıyla birlikte toplam ${kullanıcınınUyarıları.length + 1} uyarısı oldu.
                                                      Kurallara göre cezası: **${GelecekCeza (kullanıcınınUyarıları.length)}**
                                                  
                                                      Cezayı onuyor musunuz?`
                                    },
                                    {
                                        description: `${Kullanıcı.id} ${hedefKullanıcı.id} ${kullanıcınınUyarıları.length + 1}`
                                    }
                                ],
                                components: [{
                                    type: ComponentType.ActionRow,
                                    components: [
                                        new ButtonBuilder ({
                                            customId: 'cezaOnama',
                                            style: ButtonStyle.Success,
                                            label: 'Onayla',
                                            emoji: '✅'
                                        }),
                                        new ButtonBuilder ({
                                            customId: 'işlemİptali',
                                            style: ButtonStyle.Danger,
                                            label: 'İptal et',
                                            emoji: '🗑'
                                        })
                                    ]
                                }]
                            })
                        })
                    })

                    break
            
                case 'bak':
                    if (kullanıcınınUyarıları.length == 0) return Etkileşim.editReply ({
                        embeds: [{
                            color: Colors.Green,
                            author: {
                                icon_url: Etkileşim.user.displayAvatarURL (),
                                name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                            },
                            title: 'Hiçbir uyarı bulunamadı.',
                            description: `${hedefKullanıcı} adlı kullanıcının sabıkası Frank'in banyo ördeği kadar temiz!`,
                            footer: {
                                icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                            }
                        }]
                    })

                    const uyarılarEmbed = new EmbedBuilder ({
                        color: Colors.DarkNavy,
                        author: {
                            icon_url: Etkileşim.user.displayAvatarURL (),
                            name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                        },
                        title: `${Etkileşim.guild?.members.resolve (hedefKullanıcı)?.displayName} adlı kullanıcının uyarıları`,
                        description: `**Toplam uyarı sayısı:** ${EmojiSayılar (kullanıcınınUyarıları.length)}
                                      **Gelecek ceza:** ${Cezalar.indexOf (GelecekCeza (kullanıcınınUyarıları.length)) + 3}. uyarıda ${GelecekCeza (kullanıcınınUyarıları.length)}`,
                        footer: {
                            icon_url: Etkileşim.client.user?.displayAvatarURL (),
                            text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                        }
                    })

                    kullanıcınınUyarıları.forEach (kullanıcınınUyarısı => {
                        uyarılarEmbed.addFields ({
                            name: `${kullanıcınınUyarısı.Kimlik} • ${Moment (kullanıcınınUyarısı.Zaman).tz ('Europe/Istanbul').format ('DD MMMM YYYY, [saat] HH.mm.ss')}`,
                            value: `**Yetkili:** ${Etkileşim.client.users.resolve (kullanıcınınUyarısı.Uyaran)}
                                    **Gerekçe:** ${kullanıcınınUyarısı.Gerekçe}
                                    **Kanıt:** [Kanıt görseli](${kullanıcınınUyarısı.Kanıt})`
                        })
                    })

                    Etkileşim.editReply ({
                        embeds: [uyarılarEmbed]
                    })

                    break
            
                case 'sil':
                    if (kullanıcınınUyarıları.length == 0) return Etkileşim.editReply ({
                        embeds: [{
                            color: Colors.Green,
                            author: {
                                icon_url: Etkileşim.user.displayAvatarURL (),
                                name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                            },
                            title: 'Hiçbir uyarı bulunamadı.',
                            description: `${hedefKullanıcı} adlı kullanıcının sabıkası Frank'in banyo ördeği kadar temiz!`,
                            footer: {
                                icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                            }
                        }]
                    })

                    const seçimMenüsü = new SelectMenuBuilder ({
                        type: ComponentType.SelectMenu,
                        customId: 'uyarıSil',
                        minValues: 1,
                        maxValues: 1
                    }),
                          menüEylemSatırı = new ActionRowBuilder <SelectMenuBuilder> ({
                        components: [seçimMenüsü]
                    })

                    kullanıcınınUyarıları.forEach (kullanıcınınUyarısı => {
                        seçimMenüsü.addOptions (new SelectMenuOptionBuilder ({
                            label: `▪ ${kullanıcınınUyarısı.Gerekçe}`,
                            description: `${Etkileşim.client.users.resolve (kullanıcınınUyarısı.Uyaran)?.tag} tarafından • ${Moment (kullanıcınınUyarısı.Zaman).tz ('Europe/Istanbul').format ('DD MMMM YYYY, [saat] HH.mm.ss')}`,
                            value: `${kullanıcınınUyarısı.Kimlik} ${hedefKullanıcı.id}`
                        }))
                    })

                    Etkileşim.editReply ({
                        components: [menüEylemSatırı]
                    })
                    break
                
                case 'temizle':
                    if (kullanıcınınUyarıları.length == 0) return Etkileşim.editReply ({
                        embeds: [{
                            color: Colors.Green,
                            author: {
                                icon_url: Etkileşim.user.displayAvatarURL (),
                                name: `${Etkileşim.user.tag} tarafından kullanıldı.`
                            },
                            title: 'Hiçbir uyarı bulunamadı.',
                            description: `${hedefKullanıcı} adlı kullanıcının sabıkası Frank'in banyo ördeği kadar temiz!`,
                            footer: {
                                icon_url: Etkileşim.client.user?.displayAvatarURL (),
                                text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                            }
                        }]
                    })

                    kullanıcınınUyarıları.forEach (kullanıcınınUyarısı => {
                        Uyarılar.Sil (kullanıcınınUyarısı.Kimlik).catch (Sonuç => {
                            Etkileşim.followUp ({
                                embeds: [Sonuç],
                                ephemeral: true
                            })
                        })
                    })

                    Etkileşim.editReply ({
                        embeds: [Başarılı ('Kullanıcının uyarıları başarıyla temizlendi!')]
                    })
                    break

                default:
                    break
            }
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * Uyarmak için kullanıcı özel komutu eklenecek.
 * Uyarılara bakmak için kullanıcı özel komutu eklenecek.
 * Uyarı silmek için kullanıcı özel komutu eklenecek.
 * Uyarı temizlemek için kullanıcı özel komutu eklenecek.
 */

// ============================================================================================================================================================== \\