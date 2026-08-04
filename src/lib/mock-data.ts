export type League = "NBA" | "PREMIER LEAGUE" | "MLB" | "NFL" | "NHL";

export const leagueToken: Record<League, string> = {
  NBA: "var(--nba)",
  "PREMIER LEAGUE": "var(--epl)",
  MLB: "var(--mlb)",
  NFL: "var(--nfl)",
  NHL: "var(--nhl)",
};

export type TeamSide = {
  id: string;
  name: string;
  short: string;
  emoji: string;
  score: number;
  form: ("W" | "L" | "D")[];
};

export type TimelineEvent = {
  minute: string;
  type: "goal" | "card" | "sub" | "info";
  player: string;
  detail: string;
  team: string;
};

export type Match = {
  id: string;
  league: League;
  status: "live" | "upcoming" | "final";
  clock: string;
  venue: string;
  city: string;
  home: TeamSide;
  away: TeamSide;
  stats: { label: string; home: number; away: number }[];
  timeline: TimelineEvent[];
  facts: { referee: string; attendance: string; weather: string };
};

const form = (s: string) => s.split("") as ("W" | "L" | "D")[];

export const matches: Match[] = [
  {
    id: "mci-ars",
    league: "PREMIER LEAGUE",
    status: "live",
    clock: "67'",
    venue: "Etihad Stadium",
    city: "Manchester",
    home: {
      id: "man-city",
      name: "Manchester City",
      short: "Man City",
      emoji: "⚽",
      score: 3,
      form: form("WWDWL"),
    },
    away: { id: "arsenal", name: "Arsenal", short: "Arsenal", emoji: "⚽", score: 2, form: form("LWWWD") },
    stats: [
      { label: "Possession", home: 62, away: 38 },
      { label: "Shots on target", home: 8, away: 5 },
      { label: "Shots", home: 14, away: 9 },
      { label: "Passes", home: 487, away: 312 },
      { label: "Tackles", home: 12, away: 18 },
      { label: "Fouls", home: 8, away: 11 },
    ],
    timeline: [
      { minute: "15'", type: "goal", player: "Erling Haaland", detail: "Header from close range", team: "Manchester City" },
      { minute: "28'", type: "goal", player: "Bukayo Saka", detail: "Left-footed strike", team: "Arsenal" },
      { minute: "34'", type: "card", player: "Kyle Walker", detail: "Yellow card for rough tackle", team: "Manchester City" },
      { minute: "42'", type: "goal", player: "Phil Foden", detail: "Right-footed finish", team: "Manchester City" },
      { minute: "56'", type: "sub", player: "Gabriel Martinelli", detail: "Substituted in", team: "Arsenal" },
      { minute: "61'", type: "goal", player: "Leandro Trossard", detail: "Powerful strike into the bottom corner", team: "Arsenal" },
      { minute: "66'", type: "goal", player: "Erling Haaland", detail: "Tap-in after a low cross", team: "Manchester City" },
    ],
    facts: { referee: "Mike Dean", attendance: "54,500", weather: "Cloudy, 15°C" },
  },
  {
    id: "lal-bos",
    league: "NBA",
    status: "live",
    clock: "2:45 Q3",
    venue: "Crypto.com Arena",
    city: "Los Angeles",
    home: { id: "lakers", name: "Los Angeles Lakers", short: "Lakers", emoji: "🏀", score: 98, form: form("WLWWW") },
    away: { id: "celtics", name: "Boston Celtics", short: "Celtics", emoji: "🏀", score: 95, form: form("WWWLW") },
    stats: [
      { label: "Field goal %", home: 48, away: 45 },
      { label: "3PT made", home: 12, away: 14 },
      { label: "Rebounds", home: 34, away: 31 },
      { label: "Assists", home: 22, away: 19 },
      { label: "Turnovers", home: 9, away: 12 },
      { label: "Free throws", home: 15, away: 11 },
    ],
    timeline: [
      { minute: "Q1", type: "info", player: "LeBron James", detail: "12 points in the opening quarter", team: "Lakers" },
      { minute: "Q2", type: "info", player: "Jayson Tatum", detail: "Back-to-back threes", team: "Celtics" },
      { minute: "Q3", type: "info", player: "Anthony Davis", detail: "Block and slam on the break", team: "Lakers" },
    ],
    facts: { referee: "Scott Foster", attendance: "18,997", weather: "Indoor" },
  },
  {
    id: "nyy-bos",
    league: "MLB",
    status: "live",
    clock: "7th inning",
    venue: "Yankee Stadium",
    city: "New York",
    home: { id: "yankees", name: "New York Yankees", short: "Yankees", emoji: "⚾", score: 5, form: form("WWLWD") },
    away: { id: "red-sox", name: "Boston Red Sox", short: "Red Sox", emoji: "⚾", score: 3, form: form("LLWWW") },
    stats: [
      { label: "Hits", home: 9, away: 7 },
      { label: "Home runs", home: 2, away: 1 },
      { label: "Strikeouts", home: 8, away: 6 },
      { label: "Errors", home: 0, away: 2 },
      { label: "Left on base", home: 5, away: 8 },
      { label: "Walks", home: 4, away: 3 },
    ],
    timeline: [
      { minute: "2nd", type: "info", player: "Aaron Judge", detail: "Two-run homer to left field", team: "Yankees" },
      { minute: "5th", type: "info", player: "Rafael Devers", detail: "RBI double", team: "Red Sox" },
    ],
    facts: { referee: "Angel Hernandez", attendance: "42,300", weather: "Clear, 21°C" },
  },
  {
    id: "gsw-phi",
    league: "NBA",
    status: "final",
    clock: "Final",
    venue: "Chase Center",
    city: "San Francisco",
    home: { id: "warriors", name: "Golden State Warriors", short: "Warriors", emoji: "🏀", score: 112, form: form("WWLLW") },
    away: { id: "sixers", name: "Philadelphia 76ers", short: "76ers", emoji: "🏀", score: 108, form: form("LWWLW") },
    stats: [
      { label: "Field goal %", home: 51, away: 47 },
      { label: "3PT made", home: 18, away: 13 },
      { label: "Rebounds", home: 41, away: 38 },
      { label: "Assists", home: 29, away: 21 },
      { label: "Turnovers", home: 11, away: 14 },
      { label: "Free throws", home: 16, away: 19 },
    ],
    timeline: [
      { minute: "Q4", type: "info", player: "Stephen Curry", detail: "Dagger three with 40 seconds left", team: "Warriors" },
    ],
    facts: { referee: "Tony Brothers", attendance: "18,064", weather: "Indoor" },
  },
  {
    id: "kc-bal",
    league: "NFL",
    status: "upcoming",
    clock: "8:20 PM EST",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
    home: { id: "chiefs", name: "Kansas City Chiefs", short: "Chiefs", emoji: "🏈", score: 0, form: form("WWWDL") },
    away: { id: "ravens", name: "Baltimore Ravens", short: "Ravens", emoji: "🏈", score: 0, form: form("WLWWW") },
    stats: [
      { label: "Season wins", home: 11, away: 10 },
      { label: "Points per game", home: 27, away: 25 },
      { label: "Yards per game", home: 372, away: 358 },
      { label: "Turnover margin", home: 7, away: 5 },
      { label: "Sacks", home: 38, away: 41 },
      { label: "3rd down %", home: 44, away: 41 },
    ],
    timeline: [],
    facts: { referee: "Carl Cheffers", attendance: "76,400", weather: "Windy, 8°C" },
  },
  {
    id: "tor-mtl",
    league: "NHL",
    status: "upcoming",
    clock: "7:00 PM EST",
    venue: "Scotiabank Arena",
    city: "Toronto",
    home: { id: "maple-leafs", name: "Toronto Maple Leafs", short: "Maple Leafs", emoji: "🏒", score: 0, form: form("WDWLW") },
    away: { id: "canadiens", name: "Montreal Canadiens", short: "Canadiens", emoji: "🏒", score: 0, form: form("LWLWD") },
    stats: [
      { label: "Goals per game", home: 3, away: 2 },
      { label: "Power play %", home: 24, away: 19 },
      { label: "Penalty kill %", home: 82, away: 78 },
      { label: "Shots per game", home: 33, away: 29 },
      { label: "Faceoff %", home: 52, away: 48 },
      { label: "Save %", home: 91, away: 89 },
    ],
    timeline: [],
    facts: { referee: "Wes McCauley", attendance: "19,800", weather: "Indoor" },
  },
];

export type Team = {
  id: string;
  name: string;
  league: League;
  emoji: string;
  city: string;
  stadium: string;
  founded: number;
  coach: string;
  record: string;
  standing: number;
  form: ("W" | "L" | "D")[];
  seasonStats: { label: string; value: string }[];
  roster: string[];
};

export const teams: Team[] = [
  {
    id: "man-city",
    name: "Manchester City",
    league: "PREMIER LEAGUE",
    emoji: "⚽",
    city: "Manchester",
    stadium: "Etihad Stadium",
    founded: 1880,
    coach: "Pep Guardiola",
    record: "21W · 6D · 3L",
    standing: 1,
    form: form("WWDWL"),
    seasonStats: [
      { label: "Goals scored", value: "74" },
      { label: "Goals conceded", value: "28" },
      { label: "Clean sheets", value: "12" },
      { label: "Avg possession", value: "64%" },
    ],
    roster: ["erling-haaland", "phil-foden", "kevin-de-bruyne"],
  },
  {
    id: "arsenal",
    name: "Arsenal",
    league: "PREMIER LEAGUE",
    emoji: "⚽",
    city: "London",
    stadium: "Emirates Stadium",
    founded: 1886,
    coach: "Mikel Arteta",
    record: "20W · 5D · 5L",
    standing: 2,
    form: form("LWWWD"),
    seasonStats: [
      { label: "Goals scored", value: "68" },
      { label: "Goals conceded", value: "26" },
      { label: "Clean sheets", value: "14" },
      { label: "Avg possession", value: "58%" },
    ],
    roster: ["bukayo-saka", "leandro-trossard"],
  },
  {
    id: "lakers",
    name: "Los Angeles Lakers",
    league: "NBA",
    emoji: "🏀",
    city: "Los Angeles",
    stadium: "Crypto.com Arena",
    founded: 1947,
    coach: "JJ Redick",
    record: "38W · 22L",
    standing: 4,
    form: form("WLWWW"),
    seasonStats: [
      { label: "Points per game", value: "114.2" },
      { label: "Rebounds", value: "44.1" },
      { label: "Assists", value: "26.8" },
      { label: "Net rating", value: "+4.6" },
    ],
    roster: ["lebron-james", "anthony-davis"],
  },
  {
    id: "celtics",
    name: "Boston Celtics",
    league: "NBA",
    emoji: "🏀",
    city: "Boston",
    stadium: "TD Garden",
    founded: 1946,
    coach: "Joe Mazzulla",
    record: "44W · 16L",
    standing: 1,
    form: form("WWWLW"),
    seasonStats: [
      { label: "Points per game", value: "119.4" },
      { label: "Rebounds", value: "46.3" },
      { label: "Assists", value: "27.1" },
      { label: "Net rating", value: "+10.2" },
    ],
    roster: ["jayson-tatum"],
  },
  {
    id: "yankees",
    name: "New York Yankees",
    league: "MLB",
    emoji: "⚾",
    city: "New York",
    stadium: "Yankee Stadium",
    founded: 1901,
    coach: "Aaron Boone",
    record: "82W · 60L",
    standing: 2,
    form: form("WWLWD"),
    seasonStats: [
      { label: "Team AVG", value: ".261" },
      { label: "Home runs", value: "212" },
      { label: "ERA", value: "3.74" },
      { label: "Stolen bases", value: "84" },
    ],
    roster: ["aaron-judge"],
  },
  {
    id: "chiefs",
    name: "Kansas City Chiefs",
    league: "NFL",
    emoji: "🏈",
    city: "Kansas City",
    stadium: "Arrowhead Stadium",
    founded: 1960,
    coach: "Andy Reid",
    record: "11W · 3L",
    standing: 1,
    form: form("WWWDL"),
    seasonStats: [
      { label: "Points per game", value: "27.4" },
      { label: "Pass yards", value: "4,183" },
      { label: "Rush yards", value: "1,644" },
      { label: "Sacks", value: "38" },
    ],
    roster: ["patrick-mahomes"],
  },
  {
    id: "maple-leafs",
    name: "Toronto Maple Leafs",
    league: "NHL",
    emoji: "🏒",
    city: "Toronto",
    stadium: "Scotiabank Arena",
    founded: 1917,
    coach: "Craig Berube",
    record: "36W · 18L · 6OTL",
    standing: 3,
    form: form("WDWLW"),
    seasonStats: [
      { label: "Goals per game", value: "3.42" },
      { label: "Power play", value: "24.1%" },
      { label: "Penalty kill", value: "82.3%" },
      { label: "Save %", value: ".911" },
    ],
    roster: ["auston-matthews"],
  },
  {
    id: "warriors",
    name: "Golden State Warriors",
    league: "NBA",
    emoji: "🏀",
    city: "San Francisco",
    stadium: "Chase Center",
    founded: 1946,
    coach: "Steve Kerr",
    record: "34W · 26L",
    standing: 7,
    form: form("WWLLW"),
    seasonStats: [
      { label: "Points per game", value: "115.8" },
      { label: "3PT made", value: "16.4" },
      { label: "Assists", value: "29.6" },
      { label: "Net rating", value: "+2.9" },
    ],
    roster: ["stephen-curry"],
  },
];

export type Player = {
  id: string;
  name: string;
  teamId: string;
  league: League;
  position: string;
  number: number;
  age: number;
  height: string;
  country: string;
  emoji: string;
  headline: string;
  season: { label: string; value: string; pct: number }[];
  radar: { metric: string; value: number }[];
  recent: { opponent: string; line: string; rating: number }[];
};

export const players: Player[] = [
  {
    id: "erling-haaland",
    name: "Erling Haaland",
    teamId: "man-city",
    league: "PREMIER LEAGUE",
    position: "Striker",
    number: 9,
    age: 25,
    height: "1.95 m",
    country: "Norway",
    emoji: "⚽",
    headline: "League top scorer with 24 goals in 27 appearances",
    season: [
      { label: "Goals", value: "24", pct: 92 },
      { label: "Assists", value: "6", pct: 48 },
      { label: "Shots on target", value: "61", pct: 88 },
      { label: "Minutes", value: "2,310", pct: 79 },
    ],
    radar: [
      { metric: "Finishing", value: 95 },
      { metric: "Physical", value: 90 },
      { metric: "Pace", value: 86 },
      { metric: "Passing", value: 62 },
      { metric: "Dribbling", value: 70 },
      { metric: "Defending", value: 34 },
    ],
    recent: [
      { opponent: "vs Arsenal", line: "2 goals", rating: 8.9 },
      { opponent: "vs Chelsea", line: "1 goal, 1 assist", rating: 8.2 },
      { opponent: "vs Everton", line: "0 goals", rating: 6.4 },
    ],
  },
  {
    id: "bukayo-saka",
    name: "Bukayo Saka",
    teamId: "arsenal",
    league: "PREMIER LEAGUE",
    position: "Right Winger",
    number: 7,
    age: 24,
    height: "1.78 m",
    country: "England",
    emoji: "⚽",
    headline: "Most chances created in the league this season",
    season: [
      { label: "Goals", value: "13", pct: 71 },
      { label: "Assists", value: "12", pct: 90 },
      { label: "Key passes", value: "78", pct: 94 },
      { label: "Minutes", value: "2,455", pct: 84 },
    ],
    radar: [
      { metric: "Finishing", value: 78 },
      { metric: "Physical", value: 68 },
      { metric: "Pace", value: 88 },
      { metric: "Passing", value: 86 },
      { metric: "Dribbling", value: 91 },
      { metric: "Defending", value: 55 },
    ],
    recent: [
      { opponent: "vs Man City", line: "1 goal", rating: 8.4 },
      { opponent: "vs Spurs", line: "2 assists", rating: 8.7 },
      { opponent: "vs Brighton", line: "1 assist", rating: 7.5 },
    ],
  },
  {
    id: "lebron-james",
    name: "LeBron James",
    teamId: "lakers",
    league: "NBA",
    position: "Forward",
    number: 23,
    age: 41,
    height: "2.06 m",
    country: "USA",
    emoji: "🏀",
    headline: "All-time scoring leader still averaging a near triple-double",
    season: [
      { label: "Points", value: "25.4", pct: 88 },
      { label: "Rebounds", value: "7.8", pct: 66 },
      { label: "Assists", value: "8.1", pct: 89 },
      { label: "FG%", value: "52.1", pct: 81 },
    ],
    radar: [
      { metric: "Scoring", value: 92 },
      { metric: "Playmaking", value: 94 },
      { metric: "Rebounding", value: 72 },
      { metric: "Defense", value: 78 },
      { metric: "Athleticism", value: 80 },
      { metric: "IQ", value: 99 },
    ],
    recent: [
      { opponent: "vs Celtics", line: "28 pts, 9 ast", rating: 9.1 },
      { opponent: "vs Suns", line: "22 pts, 11 reb", rating: 8.3 },
      { opponent: "vs Nuggets", line: "19 pts, 7 ast", rating: 7.6 },
    ],
  },
  {
    id: "jayson-tatum",
    name: "Jayson Tatum",
    teamId: "celtics",
    league: "NBA",
    position: "Forward",
    number: 0,
    age: 28,
    height: "2.03 m",
    country: "USA",
    emoji: "🏀",
    headline: "Leading the Celtics with 27.9 points per game",
    season: [
      { label: "Points", value: "27.9", pct: 93 },
      { label: "Rebounds", value: "8.4", pct: 71 },
      { label: "Assists", value: "4.9", pct: 62 },
      { label: "3PT%", value: "37.6", pct: 74 },
    ],
    radar: [
      { metric: "Scoring", value: 95 },
      { metric: "Playmaking", value: 76 },
      { metric: "Rebounding", value: 78 },
      { metric: "Defense", value: 84 },
      { metric: "Athleticism", value: 86 },
      { metric: "IQ", value: 85 },
    ],
    recent: [
      { opponent: "vs Lakers", line: "31 pts", rating: 8.8 },
      { opponent: "vs Heat", line: "24 pts, 10 reb", rating: 8.1 },
      { opponent: "vs Knicks", line: "18 pts", rating: 7.0 },
    ],
  },
  {
    id: "aaron-judge",
    name: "Aaron Judge",
    teamId: "yankees",
    league: "MLB",
    position: "Right Fielder",
    number: 99,
    age: 34,
    height: "2.01 m",
    country: "USA",
    emoji: "⚾",
    headline: "Leads the majors with 48 home runs",
    season: [
      { label: "Home runs", value: "48", pct: 97 },
      { label: "RBI", value: "121", pct: 93 },
      { label: "AVG", value: ".312", pct: 88 },
      { label: "OPS", value: "1.048", pct: 96 },
    ],
    radar: [
      { metric: "Power", value: 99 },
      { metric: "Contact", value: 82 },
      { metric: "Speed", value: 60 },
      { metric: "Fielding", value: 84 },
      { metric: "Arm", value: 90 },
      { metric: "Discipline", value: 88 },
    ],
    recent: [
      { opponent: "vs Red Sox", line: "2-run HR", rating: 9.0 },
      { opponent: "vs Rays", line: "2 hits", rating: 7.8 },
      { opponent: "vs Orioles", line: "1 RBI", rating: 7.2 },
    ],
  },
  {
    id: "patrick-mahomes",
    name: "Patrick Mahomes",
    teamId: "chiefs",
    league: "NFL",
    position: "Quarterback",
    number: 15,
    age: 30,
    height: "1.91 m",
    country: "USA",
    emoji: "🏈",
    headline: "31 touchdown passes with only 8 interceptions",
    season: [
      { label: "Pass yards", value: "4,183", pct: 91 },
      { label: "Touchdowns", value: "31", pct: 89 },
      { label: "Completion %", value: "67.4", pct: 82 },
      { label: "Passer rating", value: "104.2", pct: 90 },
    ],
    radar: [
      { metric: "Arm", value: 97 },
      { metric: "Accuracy", value: 90 },
      { metric: "Mobility", value: 84 },
      { metric: "Vision", value: 95 },
      { metric: "Poise", value: 93 },
      { metric: "Deep ball", value: 92 },
    ],
    recent: [
      { opponent: "vs Ravens", line: "312 yds, 3 TD", rating: 9.2 },
      { opponent: "vs Bills", line: "268 yds, 2 TD", rating: 8.0 },
      { opponent: "vs Broncos", line: "221 yds, 1 TD", rating: 7.1 },
    ],
  },
  {
    id: "auston-matthews",
    name: "Auston Matthews",
    teamId: "maple-leafs",
    league: "NHL",
    position: "Center",
    number: 34,
    age: 28,
    height: "1.91 m",
    country: "USA",
    emoji: "🏒",
    headline: "42 goals and counting in a career-best season",
    season: [
      { label: "Goals", value: "42", pct: 96 },
      { label: "Assists", value: "34", pct: 78 },
      { label: "Points", value: "76", pct: 90 },
      { label: "Shooting %", value: "17.2", pct: 86 },
    ],
    radar: [
      { metric: "Shooting", value: 97 },
      { metric: "Skating", value: 86 },
      { metric: "Playmaking", value: 80 },
      { metric: "Defense", value: 82 },
      { metric: "Faceoffs", value: 88 },
      { metric: "Physical", value: 76 },
    ],
    recent: [
      { opponent: "vs Canadiens", line: "2 goals", rating: 8.9 },
      { opponent: "vs Bruins", line: "1 assist", rating: 7.4 },
      { opponent: "vs Rangers", line: "1 goal", rating: 8.0 },
    ],
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    teamId: "warriors",
    league: "NBA",
    position: "Guard",
    number: 30,
    age: 38,
    height: "1.88 m",
    country: "USA",
    emoji: "🏀",
    headline: "Still the most efficient high-volume shooter in the league",
    season: [
      { label: "Points", value: "26.1", pct: 90 },
      { label: "3PT made", value: "4.8", pct: 99 },
      { label: "Assists", value: "5.4", pct: 68 },
      { label: "FT%", value: "92.3", pct: 98 },
    ],
    radar: [
      { metric: "Shooting", value: 99 },
      { metric: "Playmaking", value: 84 },
      { metric: "Handles", value: 96 },
      { metric: "Defense", value: 62 },
      { metric: "Endurance", value: 88 },
      { metric: "IQ", value: 92 },
    ],
    recent: [
      { opponent: "vs 76ers", line: "34 pts, 7 threes", rating: 9.3 },
      { opponent: "vs Kings", line: "22 pts", rating: 7.9 },
      { opponent: "vs Clippers", line: "29 pts", rating: 8.6 },
    ],
  },
  {
    id: "phil-foden",
    name: "Phil Foden",
    teamId: "man-city",
    league: "PREMIER LEAGUE",
    position: "Attacking Midfielder",
    number: 47,
    age: 25,
    height: "1.71 m",
    country: "England",
    emoji: "⚽",
    headline: "14 goal contributions from midfield this campaign",
    season: [
      { label: "Goals", value: "11", pct: 68 },
      { label: "Assists", value: "9", pct: 76 },
      { label: "Dribbles", value: "63", pct: 84 },
      { label: "Minutes", value: "2,102", pct: 72 },
    ],
    radar: [
      { metric: "Finishing", value: 82 },
      { metric: "Physical", value: 62 },
      { metric: "Pace", value: 83 },
      { metric: "Passing", value: 88 },
      { metric: "Dribbling", value: 92 },
      { metric: "Defending", value: 58 },
    ],
    recent: [
      { opponent: "vs Arsenal", line: "1 goal", rating: 8.3 },
      { opponent: "vs Newcastle", line: "1 assist", rating: 7.7 },
      { opponent: "vs Villa", line: "0 G/A", rating: 6.8 },
    ],
  },
  {
    id: "kevin-de-bruyne",
    name: "Kevin De Bruyne",
    teamId: "man-city",
    league: "PREMIER LEAGUE",
    position: "Midfielder",
    number: 17,
    age: 34,
    height: "1.81 m",
    country: "Belgium",
    emoji: "⚽",
    headline: "Elite chance creation with 15 assists",
    season: [
      { label: "Goals", value: "5", pct: 44 },
      { label: "Assists", value: "15", pct: 97 },
      { label: "Key passes", value: "84", pct: 96 },
      { label: "Minutes", value: "1,880", pct: 64 },
    ],
    radar: [
      { metric: "Finishing", value: 78 },
      { metric: "Physical", value: 72 },
      { metric: "Pace", value: 70 },
      { metric: "Passing", value: 98 },
      { metric: "Dribbling", value: 82 },
      { metric: "Defending", value: 60 },
    ],
    recent: [
      { opponent: "vs Arsenal", line: "1 assist", rating: 8.0 },
      { opponent: "vs Fulham", line: "2 assists", rating: 8.6 },
      { opponent: "vs Wolves", line: "0 G/A", rating: 7.0 },
    ],
  },
  {
    id: "leandro-trossard",
    name: "Leandro Trossard",
    teamId: "arsenal",
    league: "PREMIER LEAGUE",
    position: "Forward",
    number: 19,
    age: 31,
    height: "1.72 m",
    country: "Belgium",
    emoji: "⚽",
    headline: "Super-sub with 8 goals off the bench",
    season: [
      { label: "Goals", value: "10", pct: 64 },
      { label: "Assists", value: "7", pct: 62 },
      { label: "Shots", value: "44", pct: 58 },
      { label: "Minutes", value: "1,410", pct: 48 },
    ],
    radar: [
      { metric: "Finishing", value: 84 },
      { metric: "Physical", value: 60 },
      { metric: "Pace", value: 78 },
      { metric: "Passing", value: 80 },
      { metric: "Dribbling", value: 85 },
      { metric: "Defending", value: 52 },
    ],
    recent: [
      { opponent: "vs Man City", line: "1 goal", rating: 8.1 },
      { opponent: "vs Palace", line: "1 goal", rating: 7.9 },
      { opponent: "vs Fulham", line: "0 G/A", rating: 6.9 },
    ],
  },
  {
    id: "anthony-davis",
    name: "Anthony Davis",
    teamId: "lakers",
    league: "NBA",
    position: "Big Man",
    number: 3,
    age: 33,
    height: "2.08 m",
    country: "USA",
    emoji: "🏀",
    headline: "Anchoring the league's third-best defense",
    season: [
      { label: "Points", value: "24.6", pct: 86 },
      { label: "Rebounds", value: "12.1", pct: 95 },
      { label: "Blocks", value: "2.4", pct: 97 },
      { label: "FG%", value: "55.8", pct: 90 },
    ],
    radar: [
      { metric: "Scoring", value: 88 },
      { metric: "Playmaking", value: 64 },
      { metric: "Rebounding", value: 94 },
      { metric: "Defense", value: 96 },
      { metric: "Athleticism", value: 88 },
      { metric: "IQ", value: 82 },
    ],
    recent: [
      { opponent: "vs Celtics", line: "26 pts, 14 reb", rating: 8.8 },
      { opponent: "vs Suns", line: "18 pts, 11 reb", rating: 7.8 },
      { opponent: "vs Nuggets", line: "22 pts, 3 blk", rating: 8.4 },
    ],
  },
];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  league: League;
  category: "Analysis" | "Recap" | "Transfer" | "Injury";
  author: string;
  readTime: string;
  time: string;
};

export const news: NewsItem[] = [
  {
    id: "haaland-record",
    title: "Haaland closes in on the all-time single-season scoring record",
    excerpt:
      "Two more goals against Arsenal put the Norwegian striker within four of a record that has stood for over a decade.",
    body:
      "Erling Haaland moved to within four goals of the all-time single-season scoring record after his clinical double against Arsenal at the Etihad. The Norwegian opener was a poacher’s finish from close range, but his second was pure power — a first-time strike from the edge of the box that left David Raya with no chance.\n\nPep Guardiola praised the timing of the runs and the relentless pressure Haaland applies on defenders. With ten games remaining, the title race is now intimately tied to whether the record books will be rewritten in Manchester.\n\nStat of the night: Haaland has now scored in 11 of his last 12 appearances across all competitions.",
    league: "PREMIER LEAGUE",
    category: "Analysis",
    author: "Imran Q.",
    readTime: "4 min",
    time: "12 min ago",
  },
  {
    id: "celtics-defense",
    title: "How Boston's switch-everything defense broke the Lakers' offense",
    excerpt: "A film breakdown of the third-quarter run that flipped the game in eleven possessions.",
    body:
      "The Celtics’ defensive scheme in the third quarter was a masterclass in communication and rotation. Over eleven possessions, Boston switched every screen, denied passing lanes and forced the Lakers into rushed, contested shots.\n\nJayson Tatum set the tone with two strip steals that led to transition threes, while Jrue Holiday’s perimeter pressure made life miserable for D’Angelo Russell. The Lakers shot 28% from the field in the quarter and committed six turnovers.\n\nWhat this means: If Boston keeps this defensive intensity, they are going to be extremely difficult to beat in a seven-game series.",
    league: "NBA",
    category: "Analysis",
    author: "Dana R.",
    readTime: "6 min",
    time: "48 min ago",
  },
  {
    id: "judge-mvp",
    title: "Aaron Judge is quietly building the strongest MVP case in a decade",
    excerpt: "Advanced numbers say the Yankees slugger is having the best offensive season of his career.",
    body:
      "Aaron Judge’s start to the season has been historic. Through 110 games, he is leading the majors in home runs, RBI and OPS while striking out at the lowest rate of his career.\n\nHis adjusted OPS+ of 195 would be the highest single-season mark in the live-ball era for a primary position player. Defensively, he has saved nearly two wins above replacement in right field.\n\nThe narrative is no longer whether Judge is an MVP candidate — it is whether anyone can mount a serious challenge.",
    league: "MLB",
    category: "Recap",
    author: "Chris V.",
    readTime: "5 min",
    time: "2 hrs ago",
  },
  {
    id: "chiefs-injury",
    title: "Chiefs list two starters as questionable ahead of Ravens clash",
    excerpt: "Kansas City's secondary could be short-handed for a game with playoff seeding implications.",
    body:
      "The Chiefs’ secondary could be significantly weakened for Sunday night’s matchup with the Ravens. Starting cornerback Trent McDuffie was ruled out Friday with a hamstring strain, while safety Justin Reid was limited in practice with a knee issue and listed as questionable.\n\nIf Reid cannot go, Kansas City will turn to rookie safety Coy Cronk on a short week — a significant drop in coverage ability and playoff experience.\n\nThe Ravens’ passing attack, led by Lamar Jackson and tight end Mark Andrews, is built to exploit exactly this kind of vulnerability.",
    league: "NFL",
    category: "Injury",
    author: "Sam T.",
    readTime: "3 min",
    time: "3 hrs ago",
  },
  {
    id: "leafs-trade",
    title: "Maple Leafs exploring a blue-line upgrade before the deadline",
    excerpt: "Toronto has been linked with two right-shot defencemen as the trade window narrows.",
    body:
      "With the trade deadline less than two weeks away, the Maple Leafs are actively pursuing right-shot defencemen who can quarterback the power play and log heavy minutes against top lines.\n\nSources indicate Toronto has held preliminary talks with two teams about rentals who would cost minimal prospects but provide immediate upgrade value. The Leafs’ current right-side options have struggled with consistency at 5-on-5.\n\nGeneral manager Brad Treliving has made no secret of his willingness to move prospects if it means improving the roster for a deep playoff run.",
    league: "NHL",
    category: "Transfer",
    author: "Alex M.",
    readTime: "4 min",
    time: "5 hrs ago",
  },
  {
    id: "curry-heat-check",
    title: "Curry's seven-three night carries Golden State past Philadelphia",
    excerpt: "The Warriors closed on a 14-2 run behind vintage off-ball movement from their captain.",
    body:
      "Stephen Curry hit seven three-pointers and scored 34 points as the Warriors erased a nine-point deficit in the final five minutes. The decisive sequence was a vintage Curry flurry: a pull-up three, a step-back three and a transition three in 98 seconds.\n\nSteve Kerr credited the team’s off-ball movement, which freed Curry repeatedly on screens set by Draymond Green and Kevon Looney. The Warriors shot 58% from three in the fourth quarter.\n\nPhiladelphia’s late-game defence fell apart after Joel Embiid picked up his sixth foul, leaving the Sixers without their anchor inside.",
    league: "NBA",
    category: "Recap",
    author: "Dana R.",
    readTime: "3 min",
    time: "6 hrs ago",
  },
];

export const getNews = (id: string) => news.find((n) => n.id === id);

export const leagues: League[] = ["NBA", "PREMIER LEAGUE", "MLB", "NFL", "NHL"];

export const getMatch = (id: string) => matches.find((m) => m.id === id);
export const getTeam = (id: string) => teams.find((t) => t.id === id);
export const getPlayer = (id: string) => players.find((p) => p.id === id);
export const playersByTeam = (teamId: string) => players.filter((p) => p.teamId === teamId);
export const matchesByTeam = (teamId: string) =>
  matches.filter((m) => m.home.id === teamId || m.away.id === teamId);
