export interface Tip {
  id: string;
  label: string;
  heading: string;
  body: string;
}

export const tips: Tip[] = [
  {
    id: "season",
    label: "Best time",
    heading: "Mar–May & Oct–mid Dec",
    body:
      "These windows give the clearest mountain views. Spring brings rhododendrons into bloom; autumn skies after the monsoon are usually the sharpest of the year.",
  },
  {
    id: "monsoon",
    label: "Avoid",
    heading: "Jun–Sep, if you can",
    body:
      "Heavy monsoon rain brings landslide risk to several hill roads and can fog out the views you came for. Trips still happen, but build in flexibility.",
  },
  {
    id: "altitude",
    label: "Altitude",
    heading: "2,050 m / 6,700 ft",
    body:
      "Not high enough for altitude sickness, but evenings turn cold even in summer. Pack layers regardless of the season.",
  },
  {
    id: "toy-train",
    label: "Toy train",
    heading: "Book ahead",
    body:
      "Joy rides between Darjeeling and Ghoom sell out fast in peak season. Reserve through IRCTC or the DHR booking counter before you plan your day around it.",
  },
  {
    id: "permits",
    label: "Permits",
    heading: "Check before you cross into Sikkim",
    body:
      "Routes toward Gangtok and parts of the eastern hills cross into Sikkim, where entry rules can differ for Indian and foreign nationals. Confirm current requirements before you go, not at the checkpoint.",
  },
  {
    id: "connectivity",
    label: "Connectivity",
    heading: "Patchy beyond town",
    body:
      "Mobile signal thins out fast on the trek routes and some of the longer drives. Download offline maps and let your homestay know your day's plan.",
  },
  {
    id: "tea-shopping",
    label: "Buying tea",
    heading: "Ask for the flush, not just the brand",
    body:
      "First flush, second flush, and autumnal teas taste genuinely different. Buying direct from an estate outlet or a long-running local shop usually beats anything sold as a generic souvenir blend.",
  },
  {
    id: "etiquette",
    label: "At the monasteries",
    heading: "Shoes off, ask before photographing",
    body:
      "Dress modestly, remove footwear where indicated, and ask before photographing monks or ceremonies in progress — most are welcoming if you ask first.",
  },
];
