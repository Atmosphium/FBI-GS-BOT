// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, Colors, ComponentType, ButtonStyle } from 'discord.js'

import Fetch from 'node-fetch'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import { Başarısız } from '../template/Gömü'

import İller from '../config/İller'

// ============================================================================================================================================================== \\

// İhracat

export const namazVakitleri: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'namaz',
    Açıklama: 'Belirttiğiniz ilin merkez ilçesine ait namaz vakitlerini gösterir.',
    Kategori: KomutKategorisi.Eğlence,
    Seçenekler: [{
        Tür: ApplicationCommandOptionType.String,
        Ad: 'il',
        Açıklama: 'Namaz vakitlerine dair bilgi almak istediğiniz ilin adı.',
        Gerekli: true
    }],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
        if (!İller.includes (Etkileşim.options.getString ('il'))) return Etkileşim.reply ({
            embeds: [Başarısız ('Geçerli bir il adı giriniz. ||Çok yakında kullanımın kolaylaştırılması için seçimli menü hâline getirilecek.||')],
            ephemeral: true
        })

        Etkileşim.deferReply ().then (async ertelenmişYanıt => {
            const ilKodu = `${500 + İller.indexOf (Etkileşim.options.getString ('il'))}`,
                  türkiyeŞehirleri = await Fetch ('https://namaz-vakti-api.herokuapp.com/cities?country=2'),
                  illerJSON = await türkiyeŞehirleri.json (),
                  ilAdı = illerJSON.find ((İl: any) => İl.sehirID == ilKodu).sehirAdi,
                  ilVeri = await Fetch (`https://namaz-vakti-api.herokuapp.com/regions?country=2&city=${ilKodu}`),
                  ilJSON = await ilVeri.json (),
                  merkezİlçe = ilJSON.find ((İlçe: any) => İlçe.IlceAdi == ilAdı),
                  merkezİlçeVeri = await Fetch (`https://namaz-vakti-api.herokuapp.com/data?region=${merkezİlçe.IlceID}`),
                  merkezİlçeJSON = await merkezİlçeVeri.json (),
                  bugününVerisi = merkezİlçeJSON [0]

            Etkileşim.editReply ({
                embeds: [{
                    color: Colors.LuminousVividPink,
                    title: `${Etkileşim.options.getString ('il')} için namaz vakitleri`,
                    description: `**İmsak:** ${bugününVerisi [1]} \n**Güneş:** ${bugününVerisi [2]} \n**Öğle:** ${bugününVerisi [3]} \n**İkindi:** ${bugününVerisi [4]} \n**Akşam:** ${bugününVerisi [5]} \n**Yatsı:** ${bugününVerisi [6]} \n`,
                    footer: {
                        icon_url: Etkileşim.client.user?.displayAvatarURL (),
                        text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
                    }
                }]
            })
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * Direkt diyanet.gov.tr'den veri alınacak.
 * 923 ilçe eklenecek.
 */

// ============================================================================================================================================================== \\