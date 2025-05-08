export type Angebotsboxen = {
    Kurs: string,
    src: string
}
export type InfoBox = {
    h2: string,
    p: string
}

export const Info = {
    Allgemeines: {
        h2: "ALLGEMEINES",
        p: "Als eine der bekanntesten und renommiertesten Tauchschulen Mallorca mit über 40 Jahren Erfahrung bieten wir Ihnen das professionelle Umfeld für eine gute und fundierte Tauchausbildung."
    },
    Sicherheit: {
        h2: "SICHERHEIT",
        p: "Ihre Sicherheit hat für uns immer höchste Priorität. Aus diesem Grund haben wir eigene TSC Sicherheits-Standards entwickelt, die dabei helfen, Kurse und Tauchaktivitäten so sicher wie möglich durchzuführen.",
    },
    Kurs_Angebote:{
        h2: "KURS-ANGEBOT",
        p: "Tauchen ist ein Outdoor-Sport ist, daher ist unser Kursprogramm den jeweiligen jahreszeitlichen Bedingungen angepasst. Trockentauchen und Workshops bieten wir hauptsächlich in den Wintermonaten an. SSI Anfänger-Tauchkurse und SSI Spezialkurse finden von April bis Oktober statt. Unser umfangreiches Kursangebot umfasst Schnuppertauchen, Anfänger-Tauchkurse, Trainings, Personal Training, Spezialkurse und Professional Kurse.",
    },
    Logistik: {
        h2: "LOGISTIK",
        p: "Unser Tauchcenter verfügt über eine hervorragende Logistik und modernstes Ausbildungs-Equipment. Theorie-Unterricht findet in einem unserer drei modern ausgestatteten Schulungsräume statt. Die Pool-Ausbildung findet in unserem 6 Meter tiefen Indoor-Tauchturm statt. Zeitraubende Fahrten zu öffentlichen Hallen- oder Freibädern entfallen, das spart Zeit und Geld."
    }
}
export const Boxen = {
    Schnuppertauchen: { 
        Kurs: "Schnuppertauchen",
        src:"https://cdn.pixabay.com/photo/2012/02/23/08/57/woman-15840_1280.jpg" ,
        alt: "Delfinschwimmen",
    },
    Delfintauchen: { 
        Kurs: "Delfintauchen",
        src:"https://cdn.pixabay.com/photo/2015/06/11/23/45/dolphin-806359_1280.jpg",
        
    },
    Korallentauchen: {
        Kurs: "Korallentauchen",
        src: "https://cdn.pixabay.com/photo/2016/04/26/22/35/coral-1355474_1280.jpg",
    },
    Tauchschein: {
        Kurs: "Tauchschein",
        src: "https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_1280.jpg"
    },
    Höhlentauchen: {
        Kurs: "Höhlentauchen",
        src: "/Höhlentauchen.png"
    }
}