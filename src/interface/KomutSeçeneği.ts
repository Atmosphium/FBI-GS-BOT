// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandOptionData, ApplicationCommandOptionType} from 'discord.js'

// ============================================================================================================================================================== \\

// İhracat

export interface TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType,
    Ad: string,
    Açıklama: string,
    Gerekli?: boolean
}

export interface KomutSeçeneğiSeçimi {
    Ad: string,
    Değer: string | number
}

export interface KomutSeçeneğiYazıSeçimi extends KomutSeçeneğiSeçimi {
    Değer: string
}

export interface KomutSeçeneğiSayıSeçimi extends KomutSeçeneğiSeçimi {
    Değer: number
}

export interface SeçimliKomutSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.String | ApplicationCommandOptionType.Number,
    Seçimler?: Array <KomutSeçeneğiYazıSeçimi | KomutSeçeneğiSayıSeçimi>
}

export interface AltKomutSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.Subcommand,
    Seçenekler?: Array <Exclude <KomutSeçeneği, AltKomutSeçeneği | AltKomutÖbeğiSeçeneği>>
}

export interface AltKomutÖbeğiSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.SubcommandGroup,
    Seçenekler: Array <AltKomutSeçeneği>
}

export interface YazıSeçeneği extends SeçimliKomutSeçeneği {
    Tür: ApplicationCommandOptionType.String,
    Seçimler?: Array <KomutSeçeneğiYazıSeçimi>
}

export interface BooleSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.Boolean
}

export interface KullanıcıSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.User
}

export interface KanalSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.Channel
}

export interface SayıSeçeneği extends SeçimliKomutSeçeneği {
    Tür: ApplicationCommandOptionType.Number,
    Seçimler?: Array <KomutSeçeneğiSayıSeçimi>
}

export interface DosyaSeçeneği extends TemelKomutSeçeneği {
    Tür: ApplicationCommandOptionType.Attachment
}

export type KomutSeçeneği = AltKomutSeçeneği | AltKomutÖbeğiSeçeneği | YazıSeçeneği | BooleSeçeneği | KullanıcıSeçeneği | KanalSeçeneği | SayıSeçeneği | DosyaSeçeneği

// ============================================================================================================================================================== \\