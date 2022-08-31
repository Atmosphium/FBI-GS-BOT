// ============================================================================================================================================================== \\

// Modüller

import { Client } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import Anık from '../event/Anık'
import EtkileşimOluştur from '../event/EtkileşimOluştur'
import İletiOluştur from '../event/İletiOluştur'
import İletiTepkiEkle from '../event/İletiTepkiEkle'

// ============================================================================================================================================================== \\

// İhracat

export default (İstemci: Client): void => {
    İstemci.once ('ready', Bot => { Anık (Bot) })
    İstemci.on ('interactionCreate', Etkileşim => { EtkileşimOluştur (Etkileşim) })
    İstemci.on ('messageCreate', İleti => { İletiOluştur (İleti) })
    İstemci.on ('messageReactionAdd', (Tepki, Kullanıcı) => { İletiTepkiEkle (Tepki, Kullanıcı) })
}

// ============================================================================================================================================================== \\