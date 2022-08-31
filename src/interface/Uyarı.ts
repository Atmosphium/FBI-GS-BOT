// ============================================================================================================================================================== \\

// Modüller

import { Snowflake } from 'discord.js'

// ============================================================================================================================================================== \\

// İhracat

export interface Uyarı {
    Kimlik: Snowflake,
    Uyarılan: Snowflake,
    Uyaran: Snowflake,
    Gerekçe: string,
    Zaman: Date,
    Kanıt: string
}

// ============================================================================================================================================================== \\