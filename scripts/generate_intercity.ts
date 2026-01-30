
import * as fs from 'fs';
import * as path from 'path';

// Raw Data from PDF
const RAW_DATA = `
1	Puttur	Badiyadka	Express	Vitla	17:45
2	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	7:15
3	B C Road	Bengaluru	Express	Madikeri, Mysuru	7:30
4	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	7:45
5	Puttur	Bengaluru	Express	Madikeri, Mysuru	8:00
6	Mangaluru	Bengaluru	Airavat	Madikeri,Mysuru	9:15
7	Puttur	Bengaluru	Express	Hasana	10:00
8	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	10:15
9	Mangaluru	Bengaluru	Airavat	Madikeri,Mysuru	11:05
10	Mangaluru	Bengaluru	Express	Madikeri,Mysuru	11:15
11	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	11:15
12	Mangaluru	Bengaluru	Express	Madikeri,Mysuru	11:40
13	Puttur	Bengaluru	Express	Kaniyuru, Kukkesubramanya	12:00
14	Mangaluru	Bengaluru	Airavat	Madikeri,Mysuru	13:15
15	Mangaluru	Bengaluru	Express	Madikeri,Mysuru	13:20
16	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	17:45
17	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	18:45
18	Puttur	Bengaluru	Rajahamsa	Bellare, Mysuru	19:45
19	Mangaluru	Bengaluru	Express	Madikeri, Mysuru	19:45
20	Puttur	Bengaluru	Rajahamsa	Kaniyuru, Kukkesubramanya	20:00
21	Puttur	Bengaluru	Rajahamsa	Kadaba, Kukkesubramanya	20:30
22	Puttur	Bengaluru	Express	Madikeri, Mysuru	20:30
23	Puttur	Bengaluru	NAC Sleeper	Madikeri, Mysuru	21:15
24	Puttur	Bengaluru	NAC Sleeper	Hassan	21:50
25	Alike	Bengaluru	Rajahamsa	Hassan	22:15
26	Puttur	Bengaluru	Rajahamsa	Hassan	22:30
27	Mangaluru	Bengaluru	Airavat	Hassan	22:30
28	B C Road	Bengaluru	NAC Sleeper	Hassan	22:40
29	Mysuru	Bhatkala	Express	Mangaluru	13:00
30	Dharmastala	Chamarajanagara	Express	Mysuru	9:45
31	Udupi	Chamarajanagara	Express	Madikeri,Mysuru	11:00
32	Dharmastala	Channarayapatna	Express	Madikeri, Somavarpete	12:20
33	Mangaluru	Coimbatore	Airavat	Mysuru	16:45
34	Puttur	Dharmastala	Express	Uppinangady, Belthangady, Ujire	8:15
35	Puttur	Dharmastala	Express	Uppinangady, Belthangady, Ujire	8:40
36	Puttur	Dharmastala	Express	Uppinangady, Belthangady, Ujire	9:30
37	Puttur	Dharmastala	Express	Uppinangady, Belthangady, Ujire	10:30
38	Puttur	Dharmastala	Express	Uppinangady, Belthangady ,Ujire	11:00
39	Madikeri	Dharmastala	Express	Uppinangady, Belthangady ,Ujire	11:45
40	Puttur	Dharmastala	Express	Uppinangady,Belthangady ,Ujire	12:30
41	Somavarapete	Dharmastala	Express	Uppinangady,Belthangady ,Ujire	10:45
42	Puttur	Dharmastala	Express	Uppinangady,Belthangady ,Ujire	12:00
43	Puttur	Dharmastala	Express	Uppinangady,Belthangady ,Ujire	13:20
44	Puttur	Dharmastala	Express	Uppinangady, Belthangady, Ujire	14:30
45	Madikeri	Dharmastala	Express	Uppinangady, Belthangady, Ujire	14:45
46	Madikeri	Dharmastala	Express	Uppinangady, Belthangady, Ujire	17:00
47	Mysuru	Gokarna	Express	Mangaluru, Kumta	11:30
48	Mangaluru	Gudlupet	Express	Mysuru	8:10
49	Puttur	Hubbali	Express	Kumta, Sirsi	7:45
50	Puttur	Kasaragod	Express	Vitla, Badiyadka	6:40
51	Puttur	Kasaragod	Express	Vitla, Badiyadka	7:15
52	Puttur	Kasaragod	Express	Vitla, Badiyadka	8:00
53	Puttur	Kasaragod	Express	Vitla, Badiyadka	12:15
54	Puttur	Kasaragod	Express	Vitla, Badiyadka	13:10
55	Puttur	Kasaragod	Rajahamsa	Vitla, Badiyadka	16:45
56	Puttur	Kasaragod	Express	Vitla, Badiyadka	9:15
57	Puttur	Kasaragod	Express	Vitla, Badiyadka	11:10
58	Mangaluru	KGF	Express	Madikeri, Mysuru	18:30
59	Dharmastala	Kollegala	Express	Madikeri, Mysuru	8:30
60	Dharmastala	Kollegala	Express	Madikeri, Mysuru	9:15
61	Mysuru	Kundapura	Express	B C Road, Mangaluru	12:30
62	Mysuru	Kundapura	Express	B C Road, Mangaluru	13:30
63	Mangaluru	Kutta	Express	Madikeri	14:15
64	Dharmastala	Madikeri	Express	Sullya	8:05
65	Dharmastala	Madikeri	Express	Sullya	10:45
66	Mangaluru	Madikeri	Express	Sullya	12:15
67	Mangaluru	Madikeri	Express	Sullya	13:00
68	Mangaluru	Madikeri	Express	Sullya	14:00
69	Mangaluru	Madikeri	Express	Sullya	14:25
70	Mangaluru	Madikeri	Express	Sullya	15:00
71	Mangaluru	Madikeri	Express	Sullya	15:30
72	Mangaluru	Madikeri	Express	Sullya	15:50
73	Mangaluru	Madikeri	Express	Sullya	16:10
74	B C Road	Madurai	Express	Madikeri, Mysuru	13:15
75	Mangaluru	Madurai	Express	Madikeri,Mysuru	16:15
76	Puttur	Malla	Express	Vitla, Badiyadka	11:15
77	Madurai	Mangaluru	Express	B C Road	7:15
78	Madikeri	Mangaluru	Express	B C Road	8:05
79	Madikeri	Mangaluru	Express	B C Road	8:45
80	Madikeri	Mangaluru	Express	B C Road	9:10
81	Bhagamandala	Mangaluru	Express	B C Road	9:30
82	Siddapura	Mangaluru	Express	B C Road	9:50
83	Madikeri	Mangaluru	Express	B C Road	10:15
84	Madikeri	Mangaluru	Express	B C Road	10:30
85	Madurai	Mangaluru	Express	B C Road	10:30
86	Virajapete	Mangaluru	Express	B C Road	11:00
87	Kutta	Mangaluru	Express	B C Road	11:15
88	Channarayapatna	Mangaluru	Express	B C Road	13:15
89	Mysuru	Mangaluru	Express	B C Road	14:30
90	Bengaluru	Mangaluru	Express	B C Road	15:30
91	Bengaluru	Mangaluru	Express	B C Road	16:30
92	Bengaluru	Mangaluru	Express	B C Road	17:30
93	Bengaluru	Mangaluru	Express	B C Road	18:00
94	Bengaluru	Mangaluru	Express	B C Road	18:30
95	Mysuru	Mangaluru	Express	B C Road	19:10
96	Gudlupet	Mangaluru	Express	B C Road	19:30
97	Nanjanagud	Mangaluru	Express	B C Road	20:15
98	Mysuru	Mangaluru	Express	B C Road	21:00
99	Mysuru	Mangaluru	Express	B C Road	21:45
100	Bengaluru	Mangaluru	Express	B C Road	22:15
101	Puttur	Mysuru	Express	Madikeri, Kushalanagara	5:45
102	Puttur	Mysuru	Express	Madikeri, Kushalanagara	6:00
103	Mangaluru	Mysuru	Express	Madikeri, Kushalanagara	6:15
104	Puttur	Mysuru	Express	Madikeri, Kushalanagara	6:30
105	Mangaluru	Mysuru	Express	Madikeri , Kushalanagara	6:45
106	Mangaluru	Mysuru	Express	Madikeri, Kushalanagara	8:15
107	Kundapura	Mysuru	Express	Madikeri, Kushalanagara	8:45
108	Udupi	Mysuru	Express	Madikeri, Kushalanagara	9:30
109	Mangaluru	Mysuru	Express	Madikeri, Kushalanagara	10:00
110	Udupi	Mysuru	Express	Madikeri , Kushalanagara	11:45
111	Kundapura	Mysuru	Express	Madikeri, Kushalanagara	12:30
112	Bhatkala	Mysuru	Express	Madikeri, Kushalanagara	13:30
113	Dharmastala	Mysuru	Express	Madikeri	13:45
114	Gokarna	Mysuru	Express	Madikeri, Kushalanagara	14:30
115	Puttur	Mysuru	Express	Madikeri, Kushalanagara	15:20
116	Mangaluru	Mysuru	Express	Madikeri, Kushalanagara	17:15
117	Mangaluru	Mysuru	Express	Madikeri, Kushalanagara	21:00
118	Mangaluru	Ooty	Rajahamsa	Mysuru	15:15
119	Puttur	Panaji	Express	Mangaluru, Kumta, Ankola	6:45
120	Dharmastala	Somavarapete	Express	Madikeri	16:30
121	Mangaluru	Somavarapete	Express	Sullya, Madikeri	16:50
122	Mysuru	Udupi	Express	Mangaluru	14:00
123	Mysuru	Udupi	Express	Mangaluru	15:00
124	Mysuru	Udupi	Express	Mangaluru	16:00
125	Bengaluru	Udupi	Express	Mangaluru	17:00
126	Mangaluru	Virajapete	Express	Madikeri	12:30
`;

// Helper map for Approx Metrics
const METRICS: Record<string, { dist: number, dur: string, price: number }> = {
    'badiyadka': { dist: 25, dur: '45m', price: 35 },
    'bengeluru': { dist: 310, dur: '7h 30m', price: 650 },
    'bengaluru': { dist: 310, dur: '7h 30m', price: 650 },
    'bhatkala': { dist: 160, dur: '4h', price: 250 },
    'chamarajanagara': { dist: 220, dur: '5h 30m', price: 350 },
    'channarayapatna': { dist: 150, dur: '3h 30m', price: 200 },
    'coimbatore': { dist: 350, dur: '8h', price: 600 },
    'dharmastala': { dist: 50, dur: '1h 30m', price: 70 },
    'gokarna': { dist: 230, dur: '5h', price: 380 },
    'gudlupet': { dist: 180, dur: '4h 30m', price: 280 },
    'hubli': { dist: 380, dur: '8h', price: 550 },
    'hubbali': { dist: 380, dur: '8h', price: 550 },
    'kasaragod': { dist: 55, dur: '1h 30m', price: 65 },
    'kgf': { dist: 350, dur: '8h 30m', price: 600 },
    'kollegala': { dist: 200, dur: '5h', price: 300 },
    'kundapura': { dist: 110, dur: '2h 30m', price: 150 },
    'kutta': { dist: 130, dur: '3h 30m', price: 180 },
    'madikeri': { dist: 85, dur: '2h', price: 110 },
    'madurai': { dist: 550, dur: '11h', price: 850 },
    'malla': { dist: 40, dur: '1h 10m', price: 50 },
    'mangaluru': { dist: 52, dur: '1h 30m', price: 60 },
    'mysuru': { dist: 160, dur: '4h', price: 210 },
    'nanjanagud': { dist: 190, dur: '4h 45m', price: 260 },
    'ooty': { dist: 250, dur: '6h', price: 400 },
    'panaji': { dist: 380, dur: '9h', price: 600 },
    'somavarapete': { dist: 110, dur: '3h', price: 150 },
    'udupi': { dist: 100, dur: '2h 15m', price: 130 },
    'virajapete': { dist: 100, dur: '2h 45m', price: 140 },
};

function parseLine(line: string) {
    const parts = line.trim().split(/\t/);
    if (parts.length < 6) return null;

    const [id, from, to, type, via, depTime] = parts;

    // Normalize To for lookup
    const toLower = to.toLowerCase().trim();
    const metrics = METRICS[toLower] || { dist: 100, dur: '3h', price: 150 };

    // Calculate Arrival Time (Very rough)
    // Extract hours/mins from depTime
    const [h, m] = depTime.split(':').map(Number);
    // Parse duration string "Xh Ym"
    const durParts = metrics.dur.match(/(\d+)h\s*(\d*)m?/);
    const durH = durParts ? parseInt(durParts[1]) : 2;
    const durM = durParts && durParts[2] ? parseInt(durParts[2]) : 0;

    let arrH = h + durH;
    let arrM = m + durM;
    if (arrM >= 60) {
        arrH += Math.floor(arrM / 60);
        arrM = arrM % 60;
    }
    arrH = arrH % 24;

    const arrivalTime = `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}`;

    return {
        id: `pdf-${id}`,
        from: from.trim(),
        to: to.trim(),
        via: via.split(',').map(s => s.trim()),
        operator: 'KSRTC', // Default to KSRTC Puttur Division
        serviceType: type.trim(),
        departureTime: depTime.trim().padStart(5, '0'), // Fix 7:15 -> 07:15
        arrivalTime: arrivalTime,
        duration: metrics.dur,
        distanceKm: metrics.dist,
        daysRunning: 'Daily',
        price: metrics.price
    };
}

const lines = RAW_DATA.trim().split('\n');
const buses = lines.map(parseLine).filter(Boolean);

// Override output path
const outputPath = path.join(__dirname, '../src/data/intercity-buses.json');
fs.writeFileSync(outputPath, JSON.stringify(buses, null, 2));

console.log(`Generated ${buses.length} buses.`);
