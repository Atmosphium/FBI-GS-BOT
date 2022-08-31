// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, Colors, ComponentType, ButtonStyle } from 'discord.js'

import Fetch from 'node-fetch'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import Kanallar from '../config/Kanallar'
import HabboGruplar from '../config/HabboGruplar'

import { Başarısız } from '../template/Gömü'

import { ŞifreOluştur } from '../func/ŞifreOluştur'

// ============================================================================================================================================================== \\

// İhracat

export const Kayıt: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'kayıt',
    Açıklama: 'Sunucuya kaydolun.',
    Kategori: KomutKategorisi.Habbo,
    Seçenekler: [{
        Tür: ApplicationCommandOptionType.String,
        Ad: 'ad',
        Açıklama: 'Habbo kullanıcı adınız.',
        Gerekli: true
    }],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
        if (Etkileşim.channelId != Kanallar.Kayıt) return Etkileşim.reply ({
            embeds: [Başarısız ('Bu komutu kullanabilmeniz için kayıt kanalında olmanız gerek.')],
            ephemeral: true
        })

        Etkileşim.deferReply ().then (async ertelenmişYanıt => {
            const kullanıcıAdı = Etkileşim.options.getString ('ad', true),
                  Veri = await Fetch (`https://habbo.com.tr/api/public/users?name=${kullanıcıAdı}`),
                  jsonVeri = await Veri.json ()

            if ('error' in jsonVeri) return Etkileşim.editReply ({
                embeds: [Başarısız (`\`${kullanıcıAdı}\` adlı bir Habbo bulunamadı.`)]
            })

            const Gruplar = await Fetch (`https://habbo.com.tr/api/public/users/${jsonVeri.uniqueId}/groups`),
                  jsonGruplar: Array <any> = await Gruplar.json (),
                  GAGrubu = jsonGruplar.find ((Grup: any) => Grup.id == HabboGruplar.Rütbe.GizliAjanlar)

            if (!GAGrubu) return Etkileşim.editReply ({
                embeds: [Başarısız ('NANİ! Siz buralı değilsiniz! Dıj güjlerin burayı istila etmek amacıyla yolladığı bir **ajan**sınız!')]
            })

            if (kullanıcıAdı == Etkileşim.user.username) return Etkileşim.editReply ({
                embeds: [Başarısız ('Güvenliğin sağlanmasından mütevellit Discord kullanıcı adınız Habbo kullanıcı adınızla aynı olamaz.')]
            })

            const Şifre = ŞifreOluştur (6, false, true, true)

            Etkileşim.editReply ({
                embeds: [
                    {
                        color: Colors.DarkNavy,
                        title: 'Siz... gerçekten siz misiniz?',
                        description: `Gerçekten de biricik \`${kullanıcıAdı}\` olduğunuzu kanıtlamak için mottonuza aşağıdaki şifreyi yazın: \`\`\`[FBI] ${Şifre}\`\`\``,
                        footer: {
                            icon_url: Etkileşim.client.user?.displayAvatarURL (),
                            text: 'FBI Gizli Servisi — Habbo\'nun ilk ve tek resmî şirketi!'
                        }
                    }
                ],
                components: [{
                    type: ComponentType.ActionRow,
                    components: [
                        new ButtonBuilder ({
                            type: ComponentType.Button,
                            style: ButtonStyle.Success,
                            customId: 'kayıtOnayla',
                            label: 'Onayla',
                            emoji: '✅'
                        }),
                        new ButtonBuilder ({
                            type: ComponentType.Button,
                            style: ButtonStyle.Danger,
                            customId: 'işlemİptali',
                            label: 'İptal et',
                            emoji: '🗑'
                        })
                    ]
                }]
            })
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * HabboJS modülüne geçilecek.
 */

// ============================================================================================================================================================== \\