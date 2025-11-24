import { Madrasa, PivotTableData, PivotRow } from './types';

export const MADRASAS_INITIAL: Madrasa[] = [
  { id: 'm1', name: 'CHALIYAM', score: 1250 },
  { id: 'm2', name: 'KUNNATHPADI', score: 1180 },
  { id: 'm3', name: 'KADALUNDI', score: 1150 },
  { id: 'm4', name: 'ANAGADI', score: 980 },
  { id: 'm5', name: 'KEEZHIYIL', score: 950 },
  { id: 'm6', name: 'KALLAMPARA', score: 920 },
  { id: 'm7', name: 'FEROKE TOWN', score: 890 },
  { id: 'm8', name: 'KARUVANTHIRUTHI', score: 850 },
  { id: 'm9', name: 'FEROKE CHANDA', score: 820 },
  { id: 'm10', name: 'CHUNGAM', score: 780 },
  { id: 'm11', name: 'KARAD', score: 750 },
  { id: 'm12', name: 'PONNEMPADAM', score: 720 },
  { id: 'm13', name: 'THIRUTHIYAD', score: 690 },
  { id: 'm14', name: 'VAZHAYOOR', score: 650 },
];

export const TICKER_NEWS = [
  "Senior category Elocution results published.",
  "Junior Watercolor competition starts at 2:00 PM at Hall B.",
  "Chaliyam maintains the lead in the overall championship.",
  "Sub-junior Quran recitation moved to Stage 3.",
  "Lunch break from 1:00 PM to 2:00 PM."
];

// Helper to generate realistic-looking random scores for the tables
const generateRows = (headersCount: number): PivotRow[] => {
  return MADRASAS_INITIAL.map((m) => {
    // Generate scores: mostly 1, 3, 5, 8, 10, or empty (0)
    const possibleScores = [0, 0, 0, 0, 0, 1, 3, 5, 5, 8, 10];
    const values = Array.from({ length: headersCount }, () => 
      possibleScores[Math.floor(Math.random() * possibleScores.length)]
    );
    const total = values.reduce((a, b) => a + b, 0);
    return {
      category: m.name,
      values,
      total
    };
  });
};

const CATEGORY_HEADERS = [
  "Quran Recitation", 
  "Hifz", 
  "Essay (Mal)", 
  "Essay (Arb)", 
  "Essay (Eng)", 
  "Translation", 
  "Digital Poster", 
  "Calligraphy (Arb)", 
  "Quiz (Arb)", 
  "Table Talk", 
  "Speech (Mal)", 
  "Speech (Arb)", 
  "Speech (Eng)", 
  "Poem (Arb-M)", 
  "Poem (Arb-F)",
  "Song (Mal-M)", 
  "Song (Mal-F)", 
  "Song (Arb-M)", 
  "Song (Arb-F)", 
  "Mappila (M)",
  "Mappila (F)", 
  "Group Song (Arb-M)", 
  "Group Song (Arb-F)",
  "Group Song (Mal-M)", 
  "Group Song (Mal-F)"
];

export const TABLES_DATA: PivotTableData[] = [
  {
    title: "Category: Senior",
    headers: CATEGORY_HEADERS,
    rows: generateRows(CATEGORY_HEADERS.length)
  },
  {
    title: "Category: Junior",
    headers: CATEGORY_HEADERS,
    rows: generateRows(CATEGORY_HEADERS.length)
  },
  {
    title: "Category: Sub Junior",
    headers: CATEGORY_HEADERS.slice(0, 15),
    rows: generateRows(15)
  },
  {
    title: "Category: Super Senior",
    headers: ["Research", "Thesis", "Public Speech", "Coding", "Debate", "Fiqh", "Hadith", "History", "Civics", "Math", "Science", "Literature", "Politics", "Journalism"],
    rows: generateRows(14)
  },
  {
    title: "Category: General",
    headers: ["Duff", "Scout", "Exhibition", "Project", "Football", "Volleyball", "Running", "Relay", "Shotput", "Javelin", "March Past", "Band", "Decoration"],
    rows: generateRows(13)
  }
];

export const URGENT_FLASH_NEWS = "ATTENTION: Painting competition venue changed to Main Auditorium due to lighting issues.";