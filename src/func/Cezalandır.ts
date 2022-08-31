// ============================================================================================================================================================== \\

// Modüller

import { User } from 'discord.js'
import { EmbedBuilder } from '@discordjs/builders'

// ============================================================================================================================================================== \\

// Dosyalar

import { UyarılarVT } from '../class/Uyarılar VT'

import Cezalar from '../config/Cezalar'

import { Başarılı, Başarısız } from '../template/Gömü'

// ============================================================================================================================================================== \\

// İhracat

export const Cezalandır = async (Kullanıcı: User) => {
    const kullanıcınınUyarıları = new UyarılarVT ().KullanıcınınUyarıları (Kullanıcı.id),
          Üye = Kullanıcı.client.guilds.resolve ('622405967249932309')?.members.resolve (Kullanıcı.id)

    if (kullanıcınınUyarıları.length < 3) return Başarısız ('Kullanıcının uyarı sayısı otomatik ceza için yetersiz.')

    let kurucuCezaVerecek = false,
        cezaVerildi = false

    switch (Cezalar [kullanıcınınUyarıları.length - 3]) {
        case Cezalar [0]:
            await Üye?.timeout (3600000).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [1]:
            await Üye?.timeout (10800000).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [2]:
            await Üye?.timeout (21600000).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [3]:
            await Üye?.timeout (43200000).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [4]:
            await Üye?.timeout (86400000).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [5]:
            await Üye?.ban ({ reason: '8. uyarı' }).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [6]:
            await Üye?.ban ({ reason: '9. uyarı' }).catch (console.log)
            cezaVerildi = true

            break

        case Cezalar [6]:
            await Üye?.ban ({ reason: '10. uyarı' }).catch (console.log)
            cezaVerildi = true

            break
    
        default:
            kurucuCezaVerecek = true
            break
    }

    if (kurucuCezaVerecek) return Başarısız ('Bu seviyedeki bir cezayı mutlaka kurucuların görüşmesi gerekir, benim haddimi aşar.')

    if (!cezaVerildi) return Başarısız ('Nedeni bilinmemekte ancak cezalandırmadan kaynaklı. [Geliştirici](https://discord.com/channels/339514931277856778) ile iletişime geçebilirsiniz.')

    return Başarılı ('Üyenin cezası başarıyla kesildi! Ayağını denk alsın... :smirk:')
}

// ============================================================================================================================================================== \\