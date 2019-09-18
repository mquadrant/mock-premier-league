import Team from '../models/teams'

// Constructing each team in an array
const teams = [
    new Team({
        _id: '5d4155cfcd68f4086d8df470',
        clubName: 'Chelsea',
        about:
            'Chelsea Football Club is an English professional football club based in Fulham, Chelsea in London',
        arena: 'Stamford Bridge',
        owner: 'Roman Abramovich',
        headCoach: 'Frank Lampard',
        founded: '1880, Stamford Bridge, London',
        nickName: 'chelsea',
        players: [
            { playerName: 'Tammy Abraham', position: 'Forward', shirtNo: 9 },
            { playerName: 'Mason Mount', position: 'Midfielder', shirtNo: 19 },
            {
                playerName: 'Christian Pulisic',
                position: 'Midfielder',
                shirtNo: 10,
            },
            { playerName: 'Fikayo Tomori', position: 'Defender', shirtNo: 5 },
            { playerName: "N'Golo Kanté", position: 'Midfielder', shirtNo: 13 },
            {
                playerName: 'Callum Hudson-Odoi',
                position: 'Forward',
                shirtNo: 20,
            },
            { playerName: 'Willian', position: 'Forward', shirtNo: 10 },
            { playerName: 'Olivier Giroud', position: 'Forward', shirtNo: 18 },
            {
                playerName: 'Emerson Palmieri',
                position: 'Defender',
                shirtNo: 33,
            },
            {
                playerName: 'Kepa Arrizabalaga',
                position: 'Goalkeeper',
                shirtNo: 13,
            },
        ],
    }),
    new Team({
        _id: '5d4155cfcd68f4086d8df471',
        clubName: 'Arsenal',
        about:
            'Arsenal Football Club is a professional football club based in Islington, London, England, that plays in the Premier League, the top flight of English football.',
        arena: 'Emirates Stadium',
        owner: 'KSE, UK, Inc.',
        headCoach: 'Unai Emery',
        founded: '1886, Woolwich, London, United Kingdom',
        nickName: 'gunners',
        players: [
            { playerName: 'Nicolas Pépé', position: 'Forward', shirtNo: 19 },
            { playerName: 'Mesut Özil', position: 'Midfielder', shirtNo: 10 },
            {
                playerName: 'Pierre-Emerick Aubameyang',
                position: 'Forward',
                shirtNo: 14,
            },
            { playerName: 'Dani Ceballos', position: 'Midfielder', shirtNo: 8 },
            { playerName: 'Kieran Tierney', position: 'Defender', shirtNo: 3 },
            {
                playerName: 'Alexandre Lacazette',
                position: 'Forward',
                shirtNo: 9,
            },
            { playerName: 'David Luiz', position: 'Defender', shirtNo: 23 },
            {
                playerName: 'Gabriel Martinelli',
                position: 'Forward',
                shirtNo: 35,
            },
            {
                playerName: 'Henrikh Mkhitaryan',
                position: 'Midfielder',
                shirtNo: 7,
            },
            {
                playerName: 'Shkodran Mustafi',
                position: 'Defender',
                shirtNo: 20,
            },
        ],
    }),
]

export default teams
