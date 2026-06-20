export interface Community {
  id: string;
  name: string;
  blurb: string;
}

export const communities: Community[] = [
  {
    id: "gorkha",
    name: "Gorkha / Nepali-speaking communities",
    blurb:
      "The majority population of the hills, made up of many distinct groups — Rai, Limbu, Tamang, Gurung, Magar and others — united mainly by the Nepali language.",
  },
  {
    id: "lepcha",
    name: "Lepcha",
    blurb:
      "Widely considered the original inhabitants of the Darjeeling-Sikkim hills, with their own language and a deep tradition of forest knowledge.",
  },
  {
    id: "bhutia",
    name: "Bhutia",
    blurb:
      "A Tibetan-Buddhist community with longstanding ties to Sikkim, present across the monasteries and trading routes of the hills.",
  },
  {
    id: "tibetan",
    name: "Tibetan refugee community",
    blurb:
      "Settled mainly through the Tibetan Refugee Self-Help Centre, founded in 1959, which is still a working centre for handicrafts and carpet weaving open to visitors.",
  },
];

export interface Festival {
  id: string;
  name: string;
  season: string;
  blurb: string;
}

export const festivals: Festival[] = [
  {
    id: "dashain",
    name: "Dashain & Tihar",
    season: "Sep–Oct",
    blurb:
      "The two biggest festivals on the Gorkha calendar, back to back — Dashain for family gatherings and blessings, Tihar for lights and the worship of crows, dogs, and cattle in turn.",
  },
  {
    id: "losar",
    name: "Losar",
    season: "Feb–Mar",
    blurb:
      "Tibetan New Year, marked at the monasteries with masked Cham dances and at home with fresh-painted doors and a special noodle soup eaten the night before.",
  },
  {
    id: "saga-dawa",
    name: "Saga Dawa",
    season: "May–Jun",
    blurb:
      "A Buddhist holy month marking the Buddha's birth, enlightenment, and death, observed with prayer flag changes and processions around the monasteries.",
  },
];

export const cuisineNotes = [
  {
    name: "Momos",
    blurb: "Steamed or fried dumplings, usually pork or vegetable, served with a thin, sharp tomato-sesame chutney.",
  },
  {
    name: "Thukpa",
    blurb: "A noodle soup, thick with vegetables and meat — the standard answer to Darjeeling's cold evenings.",
  },
  {
    name: "Churpi",
    blurb: "Hard, dried yak or cow milk cheese, chewed slowly or simmered into soups and pickles.",
  },
  {
    name: "Tea, properly made",
    blurb: "Most homes brew it plain and strong, closer to how the gardens taste it than the milky version sold to tourists.",
  },
];
