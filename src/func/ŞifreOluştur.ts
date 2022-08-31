// ============================================================================================================================================================== \\

// İhracat

export const ŞifreOluştur = (Uzunluk: number, BüyükHarf?: boolean, KüçükHarf?: boolean, Sayı?: boolean): string => {
    const BüyükHarfler = 'QWERTYUIOPASDFGHJKLZXCVBNM',
          KüçükHarfler = 'qwertyuiopasdfghjklzxcvbnm',
          Sayılar = '1234567890',
          büyükHarfDâhilEt = BüyükHarf ?? true,
          küçükHarfDâhilEt = KüçükHarf ?? true,
          sayıDâhilEt = Sayı ?? true

    let Semboller = '',
        Şifre = ''

    if (büyükHarfDâhilEt) Semboller += BüyükHarfler
    if (küçükHarfDâhilEt) Semboller += KüçükHarfler
    if (sayıDâhilEt) Semboller += Sayılar

    for (let oluşturulanŞifreUzunluğu = 0; oluşturulanŞifreUzunluğu < Uzunluk; oluşturulanŞifreUzunluğu++) {
        Şifre += Semboller.split ('') [Math.floor (Math.random () * Semboller.split ('').length)]
    }
    
    return Şifre
}

// ============================================================================================================================================================== \\