// ============================================================================================================================================================== \\

// Modüller

import { EmbedBuilder, Snowflake } from 'discord.js'

import { readFileSync, writeFileSync } from 'fs'

// ============================================================================================================================================================== \\

// Dosyalar

import { VeriTabanı } from './Veri Tabanı'

import { Uyarı } from '../interface/Uyarı'

import { Başarılı as başarılıEmbed, Başarısız as başarısızEmbed } from '../template/Gömü'

// ============================================================================================================================================================== \\

// İhracat

export class UyarılarVT extends VeriTabanı {
    public constructor (Ad?: 'Uyarılar') {
        super (Ad ?? 'Uyarılar')
    }
 
    public get Veri (): Array <Uyarı> {
        return JSON.parse (readFileSync (`./src/db/${this.Ad}.json`, { encoding: 'utf-8' }))
    }

    public KullanıcınınUyarıları (Kimlik: Snowflake): Array <Uyarı> {
        return this.Veri.filter (bulunanUyarı => bulunanUyarı?.Uyarılan == Kimlik)
    }

    public Uyar (uyarıBilgi: Uyarı): Promise <EmbedBuilder> {
        return new Promise ((Başarılı, Başarısız) => {
            const Veri = this.Veri

            Veri.push (uyarıBilgi)

            writeFileSync (`./src/db/${this.Ad}.json`, JSON.stringify (Veri))

            Başarılı (başarılıEmbed ('Kullanıcı başarıyla uyarıldı!'))
        })
    }

    public Sil (uyarıKimliği: Snowflake): Promise <EmbedBuilder> {
        return new Promise ((Başarılı, Başarısız) => {
            const Veri = this.Veri,
                  silinecekUyarı = Veri.find (birUyarı => birUyarı?.Kimlik == uyarıKimliği)

            if (!silinecekUyarı || !Veri [Veri.indexOf (silinecekUyarı)]) return Başarısız (başarısızEmbed ('Uyarı bulunamadı.'))

            delete Veri [Veri.indexOf (silinecekUyarı)]

            writeFileSync (`./src/db/${this.Ad}.json`, JSON.stringify (Veri))

            Başarılı (başarılıEmbed ('Uyarı başarıyla silindi!'))
        })
    }
}

// ============================================================================================================================================================== \\

// Dipnotlar

/**
 * Enümerasyonlu hata mesajları eklenecek.
 */

// ============================================================================================================================================================== \\