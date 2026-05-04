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
    hours: 'Pondelok - Piatok: Podľa dohody. Prosím, kontaktujte nás telefonicky vopred.'
};

const PAGE_DATA = {
    home: {
        path: 'index.html',
        summary: 'KAGEOD poskytuje profesionálne geodetické služby vo Zvolene. Na webe sú predstavené hlavné služby, dlhoročná prax a kontakt na kanceláriu.'
    },
    services: {
        path: 'sluzby.html',
        summary: 'KAGEOD poskytuje komplexné geodetické práce pre stavebníkov aj majiteľov pozemkov. Medzi hlavné služby patrí vytýčenie hraníc pozemku, zameranie stavby pre kolaudáciu a geometrické plány vrátane zmien a vecných bremien.',
        topics: [
            {
                keywords: ['vytýčenie', 'vytýcenie', 'hraníc', 'hranic', 'pozemku', 'plot', 'zlomové body', 'zlomove body'],
                answer: 'KAGEOD robí vytýčenie hraníc pozemku pri stavbe plota, kúpe nehnuteľnosti alebo pri nejasnostiach o hraniciach. Zlomové body vytýčia podľa údajov katastra nehnuteľností a polohové aj výškové vytýčenie pomáha dodržať odstupové vzdialenosti.'
            },
            {
                keywords: ['zameranie stavby', 'kolaudácia', 'kolaudacia', 'skutočný stav', 'skutocny stav', 'adresný bod', 'adresny bod', 'inžinierske siete', 'inzinierske siete'],
                answer: 'Po dokončení stavby KAGEOD zabezpečí geometrický plán na zameranie skutočného stavu stavby, ktorý je potrebný pre kolaudačné konanie a zápis stavby do katastra. Zameriavajú aj inžinierske siete, napríklad plynovody, vodovody a prípojky.'
            },
            {
                keywords: ['geometrický plán', 'geometricky plan', 'geometrické plány', 'geometricke plany', 'rozdelenie pozemku', 'sceliť', 'scelit', 'vecné bremeno', 'vecne bremeno', 'majetkoprávne', 'majetkopravne'],
                answer: 'KAGEOD vypracuje geometrický plán pri rozdelení alebo scelovaní parciel. Rieši aj vecné bremená, napríklad právo prechodu, a majetkoprávne vysporiadanie pozemkov.'
            },
            {
                keywords: ['poradenstvo', 'poradenská činnosť', 'poradenska cinnost', 'mapové podklady', 'mapove podklady', 'špecifická požiadavka', 'specificka poziadavka'],
                answer: 'Na stránke služieb KAGEOD uvádza aj poradenskú činnosť a mapové podklady pre projekty. Pri špecifickej požiadavke odporúčajú ozvať sa a nájsť riešenie pre konkrétny projekt.'
            }
        ]
    },
    about: {
        path: 'o-nas.html',
        summary: 'Geodetická kancelária KAGEOD bola založená vo Zvolene v roku 1990. Firma zdôrazňuje tradíciu, presnosť, inovácie, profesionálny prístup, dodržiavanie termínov a riešenia na mieru.',
        topics: [
            {
                keywords: ['o vás', 'o vas', 'firma', 'história', 'historia', 'tradícia', 'tradicia', 'rok 1990', 'založená', 'zalozena'],
                answer: 'Podľa stránky O nás bola geodetická kancelária KAGEOD založená vo Zvolene v roku 1990. Už viac ako tri desaťročia poskytuje klientom istotu v oblasti geodézie a kartografie.'
            },
            {
                keywords: ['skúsenosti', 'skusenosti', 'roky', '30+', 'prax', 'klienti', '1000+'],
                answer: 'Na stránke O nás KAGEOD uvádza viac ako 30 rokov na trhu a viac ako 1000 spokojných klientov.'
            },
            {
                keywords: ['tím', 'tim', 'rastislav', 'kamenský', 'kamensky', 'technológie', 'technologie', 'prístroje', 'pristroje', 'softvér', 'softver'],
                answer: 'KAGEOD uvádza, že pracuje s certifikovanými prístrojmi a najmodernejším softvérom. Na stránke je spomenutý Ing. Rastislav Kamenský a tím odborníkov ako záruka presnosti a súladu s realitou aj katastrálnymi záznamami.'
            }
        ]
    },
    contact: {
        path: 'kontakt.html',
        summary: 'KAGEOD pôsobí vo Zvolene a okolí. Na kontaktnej stránke sú telefónne čísla, e-mail, informácia o osobnom stretnutí a otváracie hodiny podľa dohody.',
        topics: [
            {
                keywords: ['kontakt', 'telefón', 'telefon', 'číslo', 'cislo', 'zavolať', 'zavolat', 'mail', 'e-mail', 'email'],
                answer: `Kontakt na KAGEOD je ${CONTACT.phones.join(', ')} a e-mail ${CONTACT.email}. Na stránke je uvedené aj osobné stretnutie priamo na pozemku alebo v kancelárii vo Zvolene.`
            },
            {
                keywords: ['otváracie hodiny', 'otvaracie hodiny', 'kedy máte otvorené', 'kedy mate otvorene', 'pondelok', 'piatok', 'dohody'],
                answer: `Otváracie hodiny sú uvedené ako: ${CONTACT.hours}`
            },
            {
                keywords: ['kde', 'zvolen', 'okolie', 'kancelária', 'kancelaria', 'stretnutie'],
                answer: 'KAGEOD pôsobí vo Zvolene a širokom okolí. Na kontaktnej stránke uvádza, že sa radi stretnú osobne priamo na pozemku alebo v kancelárii vo Zvolene.'
            }
        ]
    }
};

const FALLBACK_REPLY = `Na webe som k tomu nenašiel presnú informáciu. Prosím, kontaktujte kanceláriu KAGEOD na ${CONTACT.phones[0]} alebo e-mailom ${CONTACT.email}. Aké máte ešte nejaké otázky? Som tu pre vás.`;

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
    return `${text} Aké máte ešte nejaké otázky? Som tu pre vás.`;
}

function buildReply(text, targetPath) {
    const trimmed = text.trim();
    return targetPath ? `${trimmed} [NAVIGATE:${targetPath}]` : trimmed;
}

function keywordMatches(normalizedMessage, keyword) {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
        return false;
    }

    if (normalizedMessage.includes(normalizedKeyword)) {
        return true;
    }

    const keywordParts = normalizedKeyword.split(' ').filter((part) => part.length >= 4);
    return keywordParts.length > 0 && keywordParts.every((part) => normalizedMessage.includes(part));
}

function findTopicReply(message) {
    const normalizedMessage = normalizeText(message);
    const pages = [PAGE_DATA.contact, PAGE_DATA.services, PAGE_DATA.about];

    for (const page of pages) {
        for (const topic of page.topics) {
            const hasMatch = topic.keywords.some((keyword) => keywordMatches(normalizedMessage, keyword));

            if (hasMatch) {
                return buildReply(withClosing(topic.answer), page.path);
            }
        }
    }

    if (normalizedMessage.includes('sluzby') || normalizedMessage.includes('co robite') || normalizedMessage.includes('ponukate')) {
        return buildReply(withClosing(PAGE_DATA.services.summary), PAGE_DATA.services.path);
    }

    if (normalizedMessage.includes('o vas') || normalizedMessage.includes('kto ste')) {
        return buildReply(withClosing(PAGE_DATA.about.summary), PAGE_DATA.about.path);
    }

    if (normalizedMessage.includes('kontakt') || normalizedMessage.includes('adresa')) {
        return buildReply(withClosing(PAGE_DATA.contact.summary), PAGE_DATA.contact.path);
    }

    if (normalizedMessage.includes('kageod') || normalizedMessage.includes('geodet')) {
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
