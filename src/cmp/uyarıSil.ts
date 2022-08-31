// ============================================================================================================================================================== \\

// Modüller

import { Colors } from 'discord.js'
import Moment from 'moment-timezone'

// ============================================================================================================================================================== \\

// Dosyalar

import { MenüBileşeni } from '../interface/Bileşen'

import { UyarılarVT } from '../class/Uyarılar VT'

import { Başarısız as başarısızEmbed } from '../template/Gömü'

import Kanallar from '../config/Kanallar'

// ============================================================================================================================================================== \\

// İhracat

Moment.locale ('tr')

export const uyarıSil: MenüBileşeni = {
    Kimlik: 'uyarıSil',
    Çalıştır (Etkileşim, Değişkenler) {
        const Uyarılar = new UyarılarVT (),
              tespitEdilenUyarı = Uyarılar.KullanıcınınUyarıları (Değişkenler [1]).find (Uyarı => Uyarı.Kimlik == Değişkenler [0])

        Uyarılar.Sil (Değişkenler [0]).then (Sonuç => {
            Etkileşim.message.edit ({
                embeds: [Sonuç],
                components: []
            }).then (İleti => {
                Etkileşim.deferReply ().then (() => Etkileşim.deleteReply ())
                const System = Etkileşim.guild?.channels.resolve (Kanallar.Bildiriler.Sistem)

                if (!System?.isTextBased ()) return

                const Gerekçe = tespitEdilenUyarı.Gerekçe.startsWith ('BÜYÜK HARF') ? tespitEdilenUyarı.Gerekçe : tespitEdilenUyarı.Gerekçe.replace (tespitEdilenUyarı.Gerekçe.split ('') [0], tespitEdilenUyarı.Gerekçe.split ('') [0].toLowerCase ())

                System.send ({
                    embeds: [{
                        color: Colors.Green,
                        title: 'Bir uyarı silindi!',
                        description: `${Etkileşim.member} adlı yetkili, <@${tespitEdilenUyarı.Uyarılan}> adlı kullanıcının **${Gerekçe}** <@${tespitEdilenUyarı.Uyaran}> adlı yetkili tarafından verilen **${Moment (tespitEdilenUyarı.Zaman).format ('DD MMMM YYYY, [saat] HH.mm.ss')}** tarihli uyarısını sildi.`
                    }]
                })
            }).catch (Sorun => {
                Etkileşim.reply ({
                    embeds: [başarısızEmbed (Sorun.toString ())],
                    ephemeral: true
                })
            })
        })
    }
}

// ============================================================================================================================================================== \\