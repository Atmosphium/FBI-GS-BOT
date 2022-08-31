// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, Colors } from 'discord.js'
import { EmbedBuilder } from '@discordjs/builders'

import Fetch from 'node-fetch'

import Moment from 'moment-timezone'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { KomutKategorisi } from '../enum/KomutKategorisi'

import HabboGruplar from '../config/HabboGruplar'
import Emojiler from '../config/Emojiler'

import { Başarısız } from '../template/Gömü'

// ============================================================================================================================================================== \\

Moment.locale ('tr')

// İhracat

export const Profil: SöyleşiBölümüGirdiKomutu = {
    Tür: ApplicationCommandType.ChatInput,
    Ad: 'profil',
    Açıklama: 'Kendinizin veya bir başkasının Habbo profiline bakın.',
    Kategori: KomutKategorisi.Habbo,
    Seçenekler: [{
        Tür: ApplicationCommandOptionType.String,
        Ad: 'ad',
        Açıklama: 'Profiline bakmak istediğiniz Habbo\'nun kullanıcı adı.'
    }],
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => {
        Etkileşim.deferReply ().then (async ertelenmişYanıt => {
            const kullanıcıAdı = Etkileşim.options.getString ('ad') ?? Etkileşim.guild.members.resolve (Etkileşim.user.id).displayName,
                  Veri = await Fetch (`https://habbo.com.tr/api/public/users?name=${kullanıcıAdı}`),
                  jsonVeri = await Veri.json ()

            if ('error' in jsonVeri) return Etkileşim.editReply ({
                embeds: [Başarısız (`\`${kullanıcıAdı}\` adlı bir Habbo bulunamadı.`)]
            })

            const Gruplar = await Fetch (`https://habbo.com.tr/api/public/users/${jsonVeri.uniqueId}/groups`),
                  jsonGruplar: Array <any> = await Gruplar.json (),
                  GAGrubu = jsonGruplar.find ((Grup: any) => Grup.id == HabboGruplar.Rütbe.GizliAjanlar)

            const VIP = jsonGruplar.find (Grup => Grup.id == HabboGruplar.VIP.VIP3) ? `<:vip3:${Emojiler.VIP.VIP3}> 3. Düzey` : jsonGruplar.find (Grup => Grup.id == HabboGruplar.VIP.VIP2) ? `<:vip2:${Emojiler.VIP.VIP2}> 2. Düzey` : jsonGruplar.find (Grup => Grup.id == HabboGruplar.VIP.VIP1) ? `<:vip1:${Emojiler.VIP.VIP1}> 1. Düzey` : 'Bulunmamakta.',
                  SM = jsonGruplar.find (Grup => Grup.id == HabboGruplar.SM.SMLTD) ? `<:sm3:${Emojiler.SM.SMLTD}> 3. Düzey` : jsonGruplar.find (Grup => Grup.id == HabboGruplar.SM.SMPLUS) ? `<:sm2:${Emojiler.SM.SMPLUS}> 2. Düzey` : jsonGruplar.find (Grup => Grup.id == HabboGruplar.SM.SMECO) ? `<:sm1:${Emojiler.SM.SMECO}> 1. Düzey` : 'Bulunmamakta.',
                  sonGiriş = Moment (jsonVeri.lastAccessTime).tz ('Europe/Istanbul'),
                  sgSonuç = Moment ().diff (sonGiriş, 'minutes') > 60 ? Moment ().diff (sonGiriş, 'hours') + ' saat ' + (Moment ().diff (sonGiriş, 'minutes') - Moment ().diff (sonGiriş, 'hours') * 60) + ' dakika' : Moment ().diff (sonGiriş, 'minutes') + ' dakika',
                  Buralımı = GAGrubu ? true : false

            const Yanıt = new EmbedBuilder ({
                color: Colors.Orange,
                title: 'Habbo Profili',
                description: `${kullanıcıAdı} adlı Habbo'nun profili:`,
                thumbnail: {
                    url: `https://www.habbo.com.tr/habbo-imaging/avatarimage?user=${kullanıcıAdı}&action=wav&direction=2&head_direction=3&gesture=sml&size=l`
                },
                fields: [
                    { name: 'Motto', value: jsonVeri.motto.length > 0 ? jsonVeri.motto : '*Mottonu güncelle...*', inline: true },
                    { name: jsonVeri.online ? 'Çevrim içi süresi' : 'Son giriş zamanı', value: jsonVeri.online ? sgSonuç : `${sgSonuç} önce`, inline: true }
                ],
                footer: {
                    icon_url: Etkileşim.client.user?.displayAvatarURL (),
                    text: 'FBI Gizli Servisi — Habbo\'nun ilk ve tek resmî şirketi!'
                }
            })

            if (GAGrubu) Yanıt.addFields ([
                { name: 'VIP Üyeliği', value: VIP, inline: true },
                { name: 'SM Üyeliği', value: SM, inline: true }
            ])
            
            Etkileşim.editReply ({
                embeds: [Yanıt]
            })
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * HabboJS modülüne geçilecek.
 * Kullanıcı özel komutu eklenecek.
 */

// ============================================================================================================================================================== \\