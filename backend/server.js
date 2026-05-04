require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const CONTACT = {
    phones: ['+421 903 567 411', '+421 45 5479 783', '+421 903 806 831'],
    email: 'kageod@kageod.sk',
    location: 'Zvolen a okolie',
    hours: 'Pondelok - Piatok: Podla dohody. Prosim, kontaktujte nas telefonicky vopred.'
};

const PAGE_DATA = {
    home: {
        path: 'index.html',
        summary: 'KAGEOD poskytuje profesionalne geodeticke sluzby vo Zvolene. Na webe su predstavene hlavne sluzby, dlhorocna prax a kontakt na kancelariu.'
    },
    services: {
        path: 'sluzby.html',
        summary: 'KAGEOD poskytuje komplexne geodeticke prace pre stavebnikov aj majitelov pozemkov.',
        overview: 'KAGEOD ponuka najma vytýcenie hranic pozemku, zameranie stavby pre kolaudaciu, geometricke plany, riesenie vecnych bremien, majetkopravne vysporiadanie pozemkov, poradensku cinnost a mapove podklady pre projekty.',
        topics: [
            {
                keywords: ['vytýcenie', 'vytýcenie hranic', 'hranice pozemku', 'plot', 'zlomove body', 'pozemok'],
                answer: 'KAGEOD robi vytýcenie hranic pozemku pri stavbe plota, kupe nehnutelnosti alebo pri nejasnostiach o hraniciach. Zlomove body vytýcia podla udajov katastra nehnutelnosti a polohove aj vyskove vytýcenie pomaha dodrzat odstupove vzdialenosti.'
            },
            {
                keywords: ['zameranie stavby', 'kolaudacia', 'skutocny stav', 'adresny bod', 'inzinierske siete', 'pripojky'],
                answer: 'Po dokonceni stavby KAGEOD zabezpeci geometricky plan na zameranie skutocneho stavu stavby, ktory je potrebny pre kolaudacne konanie a zapis stavby do katastra. Zameriavaju aj inzinierske siete, naprklad plynovody, vodovody a pripojky.'
            },
            {
                keywords: ['geometricky plan', 'geometricke plany', 'rozdelenie pozemku', 'scelenie parciel', 'vecne bremeno', 'majetkopravne'],
                answer: 'KAGEOD vypracuje geometricky plan pri rozdeleni alebo scelovani parciel. Riesi aj vecne bremena, naprklad pravo prechodu, a majetkopravne vysporiadanie pozemkov.'
            },
            {
                keywords: ['poradenstvo', 'poradenska cinnost', 'mapove podklady', 'specificka poziadavka'],
                answer: 'Na stranke sluzieb KAGEOD uvadza aj poradensku cinnost a mapove podklady pre projekty. Pri specifickej poziadavke odporuca ozvat sa a najst riesenie pre konkretny projekt.'
            }
        ]
    },
    about: {
        path: 'o-nas.html',
        summary: 'Geodeticka kancelaria KAGEOD bola zalozena vo Zvolene v roku 1990. Firma zdoraznuje tradiciu, presnost, inovacie, profesionalny pristup, dodrziavanie terminov a riesenia na mieru.',
        overview: 'KAGEOD je geodeticka kancelaria zo Zvolena zalozena v roku 1990. Na webe zdoraznuje viac ako 30 rokov praxe, viac ako 1000 klientov, profesionalny pristup a pracu s modernymi technologiami.',
        topics: [
            {
                keywords: ['o vas', 'o firme', 'historia', 'tradicia', 'rok 1990', 'zalozena'],
                answer: 'Podla stranky O nas bola geodeticka kancelaria KAGEOD zalozena vo Zvolene v roku 1990. Uz viac ako tri desatrocia poskytuje klientom istotu v oblasti geodezie a kartografie.'
            },
            {
                keywords: ['skusenosti', 'roky praxe', '30 rokov', '1000 klientov', 'prax'],
                answer: 'Na stranke O nas KAGEOD uvadza viac ako 30 rokov na trhu a viac ako 1000 spokojnych klientov.'
            },
            {
                keywords: ['ako dlho', 'kolko rokov', 'venujete', 'fungujete dlho', 'od kedy'],
                answer: 'Podla informacii na webe sa KAGEOD venuje geodezii od roku 1990, teda viac ako 30 rokov.'
            },
            {
                keywords: ['tim', 'rastislav kamensky', 'technologie', 'pristroje', 'softver'],
                answer: 'KAGEOD uvadza, ze pracuje s certifikovanymi pristrojmi a najmodernejsim softverom. Na stranke je spomenuty Ing. Rastislav Kamensky a tim odbornikov ako zaruka presnosti a suladu s realitou aj katastralnymi zaznamami.'
            }
        ]
    },
    contact: {
        path: 'kontakt.html',
        summary: 'KAGEOD posobi vo Zvolene a okoli. Na kontaktnej stranke su telefonne cisla, e-mail, informacia o osobnom stretnuti a otvaracie hodiny podla dohody.',
        topics: [
            {
                keywords: ['kontakt', 'telefon', 'cislo', 'zavolat', 'mail', 'email'],
                answer: `Kontakt na KAGEOD je ${CONTACT.phones.join(', ')} a e-mail ${CONTACT.email}. Na stranke je uvedene aj osobne stretnutie priamo na pozemku alebo v kancelarii vo Zvolene.`
            },
            {
                keywords: ['otvaracie hodiny', 'kedy mate otvorene', 'pondelok', 'piatok', 'dohoda'],
                answer: `Otvaracie hodiny su uvedene takto: ${CONTACT.hours}`
            },
            {
                keywords: ['kde sidlite', 'zvolen', 'okolie', 'kancelaria', 'stretnutie'],
                answer: 'KAGEOD posobi vo Zvolene a sirokom okoli. Na kontaktnej stranke uvadza, ze sa radi stretnu osobne priamo na pozemku alebo v kancelarii vo Zvolene.'
            }
        ]
    }
};

const INTENTS = [
    {
        path: PAGE_DATA.services.path,
        triggers: ['co ponukas', 'co ponukate', 'co robite', 'ake sluzby', 'ake ponukate', 'ponuka', 'ponukas', 'ponukate', 'sluzby'],
        reply: PAGE_DATA.services.overview
    },
    {
        path: PAGE_DATA.about.path,
        triggers: ['kto ste', 'co ste za firmu', 'o vas', 'o firme', 'historia firmy', 'ako dlho fungujete', 'ako dlho sa tomu venujete', 'ako dlho sa tomu uz venujete', 'kolko rokov to robite', 'kolko rokov fungujete', 'kedy ste vznikli'],
        reply: PAGE_DATA.about.overview
    },
    {
        path: PAGE_DATA.contact.path,
        triggers: ['ako vas kontaktovat', 'kontaktovat', 'mozem kontaktovat', 'kontakt', 'adresa', 'telefon', 'cislo', 'email', 'mail', 'kde sidlite'],
        reply: PAGE_DATA.contact.summary
    }
];

const FALLBACK_REPLY = `Prosim, kontaktujte kancelariu KAGEOD na ${CONTACT.phones[0]} alebo e-mailom ${CONTACT.email}. Radi vam poradia aj pri specifickej poziadavke. Ake mate este nejake otazky? Som tu pre vas.`;

function normalizeText(value) {
    return (value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function withClosing(text) {
    return `${text} Ake mate este nejake otazky? Som tu pre vas.`;
}

function buildReply(text, targetPath) {
    const trimmed = text.trim();
    return targetPath ? `${trimmed} [NAVIGATE:${targetPath}]` : trimmed;
}

function phraseMatches(normalizedMessage, phrase) {
    const normalizedPhrase = normalizeText(phrase);
    if (!normalizedPhrase) return false;
    if (normalizedMessage.includes(normalizedPhrase)) return true;

    const phraseParts = normalizedPhrase.split(' ').filter((part) => part.length >= 2);
    if (normalizedPhrase.includes(' ') && phraseParts.length < 2) return false;
    return phraseParts.length > 0 && phraseParts.every((part) => normalizedMessage.includes(part));
}

function stemMatches(normalizedMessage, term) {
    const normalizedTerm = normalizeText(term);
    if (!normalizedTerm) return false;

    const words = normalizedMessage.split(' ').filter(Boolean);
    const stem = normalizedTerm.slice(0, Math.max(4, normalizedTerm.length - 2));
    return words.some((word) => word.startsWith(stem));
}

function matchesAny(normalizedMessage, phrases) {
    return phrases.some((phrase) => phraseMatches(normalizedMessage, phrase) || stemMatches(normalizedMessage, phrase));
}

function findTopicReply(message) {
    const normalizedMessage = normalizeText(message);
    const pages = [PAGE_DATA.contact, PAGE_DATA.services, PAGE_DATA.about];

    if (
        normalizedMessage.includes('kontakt') ||
        normalizedMessage.includes('telefon') ||
        normalizedMessage.includes('email') ||
        normalizedMessage.includes('mail') ||
        normalizedMessage.includes('cislo') ||
        normalizedMessage.includes('zavolat') ||
        normalizedMessage.includes('kontaktovat')
    ) {
        return buildReply(withClosing(PAGE_DATA.contact.topics[0].answer), PAGE_DATA.contact.path);
    }

    if (
        normalizedMessage.includes('sluz') ||
        normalizedMessage.includes('ponuk') ||
        normalizedMessage.includes('geometr') ||
        normalizedMessage.includes('kolaud') ||
        normalizedMessage.includes('pozem')
    ) {
        return buildReply(withClosing(PAGE_DATA.services.overview), PAGE_DATA.services.path);
    }

    if (
        normalizedMessage.includes('kto ste') ||
        normalizedMessage.includes('firma') ||
        normalizedMessage.includes('historia') ||
        normalizedMessage.includes('vznik') ||
        normalizedMessage.includes('o vas') ||
        normalizedMessage.includes('ako dlho') ||
        normalizedMessage.includes('kolko rokov') ||
        normalizedMessage.includes('venujete') ||
        normalizedMessage.includes('prax')
    ) {
        return buildReply(withClosing(PAGE_DATA.about.overview), PAGE_DATA.about.path);
    }

    for (const intent of INTENTS) {
        if (matchesAny(normalizedMessage, intent.triggers)) {
            return buildReply(withClosing(intent.reply), intent.path);
        }
    }

    for (const page of pages) {
        for (const topic of page.topics) {
            if (matchesAny(normalizedMessage, topic.keywords)) {
                return buildReply(withClosing(topic.answer), page.path);
            }
        }
    }

    if (normalizedMessage.includes('geodet') || normalizedMessage.includes('kageod')) {
        return buildReply(withClosing(PAGE_DATA.home.summary), PAGE_DATA.home.path);
    }

    return FALLBACK_REPLY;
}

app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const reply = findTopicReply(message);
    return res.json({ reply });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Backend server listening at port ${port}`);
});
