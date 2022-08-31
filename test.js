/*const String1 = 'mütevellit mütebeddil müteşekkir müteşebbis ihtiyarlık',
      String2 = 'mütevellit mübeteddil müşetekkir müteşebbis'
      
let [Array1, Array2, Farklar] = [String1.split (' '), String2.split (' '), '']

if (Array1.length == Array2.length) {
    for (let wordIndex = 0; wordIndex < Array1.length; wordIndex++) {
        if (Array1 [wordIndex] == Array2 [wordIndex]) continue

        Farklar += '**' + Array2 [wordIndex] + '** '
    }
} else {
    if (Array1.length > Array2.length) {
        for (let wordIndex = 0; wordIndex < Array2.length; wordIndex++) {
            if (Array1 [wordIndex] == Array2 [wordIndex]) continue
    
            Farklar += '**' + Array2 [wordIndex] + '** '
        }

        Array1.slice (Array2.length).forEach (Remaining => Farklar += '**' + Remaining + '** ')
    } else {
        for (let wordIndex = 0; wordIndex < Array1.length; wordIndex++) {
            if (Array1 [wordIndex] == Array2 [wordIndex]) continue
    
            Farklar += '**' + Array2 [wordIndex] + '** '
        }

        Array2.slice (Array1.length).forEach (Remaining => Farklar += '**' + Remaining + '** ')
    }
}

Array1.forEach (Sözcük => {
    if (Farklar.includes ('**' + Sözcük + '**')) Array1 [Array1.indexOf (Sözcük)] = '**' + Sözcük + '**'
})

Array2.forEach (Sözcük => {
    if (Farklar.includes ('**' + Sözcük + '**')) Array2 [Array2.indexOf (Sözcük)] = '**' + Sözcük + '**'
})*/

/*const Veri = {
    EşSahip: 'eş',
    İstihbarat: 'ist',
    Cumhurbaşkanları: 'cb',
    Bakanlar: 'bb',
    Görevliler: 'mod',
    Leadership: '',
    ÜDY: '',
    Hakveİlişkiler: '',
    Müdürler: '',
    RoomCTRL: '',
    YönetimBürosu: '',
    DışİşleriBakanlığı: '',
    OperasyonYetkilileri: '',
    Diplomatlar: '',
    YüksekRütbe: '',
    YasalİşlerBakanlığı: '',
    EğitimBölümü: '',
    GüvenlikEkibi: '',
    GizliAjanlar: ''
},
    Adlar = Object.keys (Veri),
    Kodlar = Object.values (Veri)

for (let Sıra = 0; Sıra < Kodlar.length; Sıra++) {
    const Kod = Kodlar [Sıra]
    
    if (Kod != 'cb') continue

    console.log (Adlar [Kodlar.indexOf (Kod)])
}*/

const Moment = require ('moment-timezone'),
      sonGiriş = Moment ([2022, 7, 31]),
      Şimdi = Moment ()

console.log (Şimdi.diff (sonGiriş, 'hours'))