/* eslint-disable */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const INPUT_FILE = path.join(process.cwd(), 'PutturBusstand.html');
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'bus-routes.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
  const html = fs.readFileSync(INPUT_FILE, 'utf-8');
  const $ = cheerio.load(html);
  const buses = [];

  console.log('Parsing HTML...');

  $('tr').each((i, row) => {
    const cols = $(row).find('td');
    // We expect 6 columns: Sl.No, From, To, Via, Class, Departure Time
    if (cols.length >= 6) {
      const from = $(cols[1]).text().trim();
      const to = $(cols[2]).text().trim();
      const via = $(cols[3]).text().trim();
      const type = $(cols[4]).text().trim();
      const time = $(cols[5]).text().trim();

      // Basic validation
      if (from && to && time && time !== 'Departure Time') {
        buses.push({
          id: i,
          from,
          to,
          via,
          type,
          time
        });
      }
    }
  });

  console.log(`Found ${buses.length} bus routes.`);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(buses, null, 2));
  console.log(`Successfully wrote data to ${OUTPUT_FILE}`);

} catch (error) {
  console.error('Error processing data:', error);
  process.exit(1);
}
