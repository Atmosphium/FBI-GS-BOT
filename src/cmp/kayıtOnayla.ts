// ============================================================================================================================================================== \\

// Modüller

import { ButtonBuilder, Colors, ComponentType, ButtonStyle } from 'discord.js'

import Fetch from 'node-fetch'

import { setImmediate } from 'node:timers/promises'

// ============================================================================================================================================================== \\

// Dosyalar

import { DüğmeBileşeni } from '../interface/Bileşen'

import { Başarılı, Başarısız } from '../template/Gömü'

import HabboGruplar from '../config/HabboGruplar'
import Roller from '../config/Roller'
import Kanallar from 'src/config/Kanallar'

// ============================================================================================================================================================== \\

// İhracat

export const kayıtOnayla: DüğmeBileşeni = {
    Kimlik: 'kayıtOnayla',
    Çalıştır (Etkileşim, Değişkenler) {
        if (Etkileşim.user.id != Etkileşim.message.interaction?.user.id) return Etkileşim.reply ({
            embeds: [Başarısız ('Milletin işine ne karışıyo\'sunuz be?!')],
            ephemeral: true
        })

        Etkileşim.deferReply ().then (async ertelenmişYanıt => {
            await Etkileşim.deleteReply ()

            const Veri = await Fetch (`https://habbo.com.tr/api/public/users?name=${Etkileşim.message.embeds [0].description?.split (' ') [3].replaceAll ('`', '')}`),
                  jsonVeri = await Veri.json ()

            if (jsonVeri.motto != `[FBI] ${Etkileşim.message.embeds [0].description?.split (' ') [Etkileşim.message.embeds [0].description.split (' ').length - 1].replace ('```', '')}`) return Etkileşim.message.edit ({
                embeds: [Başarısız ('Mottonuz, size sunulan kayıt şifresiyle eşleşmemekte.')],
                components: []
            })

            Etkileşim.message.edit ({
                embeds: [Başarılı ('Başarıyla kaydoldunuz!')],
                components: [{
                    type: ComponentType.ActionRow,
                    components: [new ButtonBuilder ({
                        style: ButtonStyle.Success,
                        customId: 'Onaylandı',
                        label: 'Onaylandı.',
                        emoji: '✅',
                        disabled: true
                    })]
                }]
            }).then (async İleti => {
                const Adlar = Object.keys (HabboGruplar.Rütbe),
                      Kodlar = Object.values (HabboGruplar.Rütbe),
                      Gruplar = await Fetch (`https://habbo.com.tr/api/public/users/${jsonVeri.uniqueId}/groups`),
                      jsonGruplar: Array <any> = await Gruplar.json ()

                for (let Sıra = 0; Sıra < Kodlar.length; Sıra++) {
                    const Rütbe = Adlar [Sıra],
                          Kod = Kodlar [Sıra]

                    if (!jsonGruplar.find (Grup => Grup.id == Kod)) continue

                    const Rol = Etkileşim.guild.roles.resolve (Roller.Rütbe [Rütbe])

                    Etkileşim.guild?.members.resolve (Etkileşim.user.id)?.roles.add (Rol)
                    Etkileşim.guild?.members.resolve (Etkileşim.user.id).setNickname (jsonVeri.name)

                    const Log = Etkileşim.guild.channels.resolve (Kanallar.Bildiriler.Kayıt)
                    
                    if (Log.isTextBased ()) Log.send ({
                        embeds: [{
                            color: Colors.Green,
                            description: `${Etkileşim.user} sunucuya ${Rol} rütbesiyle kayıt oldu!`
                        }]
                    })

                    break
                }
            })
        })
    }
}

// ============================================================================================================================================================== \\